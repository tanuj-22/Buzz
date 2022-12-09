import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { client } from "../lib/client";
export const TwitterContext = createContext();

export const TwitterProvider = ({ children }) => {
  const [appStatus, setAppStatus] = useState("loading");
  const [currentAccount, setCurrentAccount] = useState("");
  const [tweets, setTweets] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  const router = useRouter();

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    if (!currentAccount || appStatus !== "connected") return;
    getCurrentUserDetails(currentAccount);
    fetchTweets();
  }, [currentAccount, appStatus]);

  useEffect(() => {
    if (!currentAccount || appStatus !== "connected" || tweets === []) return;
    //change useEffect to listen for updates dependency array and tweets if
    // console.log("listening for updates");
    const listenerQuery = ` *[ _type == "tweets"  && author._ref != $currentAccount ]`;
    const params = { currentAccount: currentAccount };
    // pending update based on newTweetCount
    const options = {
      visibility: "query",
      includeResult: true,
      includePreviousResult: false,
    };

    const subscription = client
      .listen(listenerQuery, params, options)
      .subscribe(() => {
        fetchTweets({ timestampBefore: tweets[0].timestamp });
      });
    return () => {
      // console.log("unsubscribing");
      subscription.unsubscribe();
    };
  }, [tweets]);

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) {
      console.log("Make sure you have metamask!");
      return setAppStatus("noMetamask");
    }
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        setCurrentAccount(addressArray[0]);
        createUserAccount(addressArray[0]);

        setAppStatus("connected");
      } else {
        // router.push("/");
        setAppStatus("notConnected");
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const connectToWallet = async () => {
    if (!window.ethereum) {
      console.log("Get metamask!");
      return setAppStatus("noMetamask");
    }
    try {
      setAppStatus("loading");

      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (addressArray.length > 0) {
        setCurrentAccount(addressArray[0]);
        createUserAccount(addressArray[0]);
        setAppStatus("connected");
      } else {
        // router.push("/");
        setAppStatus("notConnected");
        router.push("/");
      }
    } catch (err) {
      setAppStatus("error");
      console.log(err);
    }
  };

  const createUserAccount = async (userWalletAddress = currentAccount) => {
    if (!window.ethereum) {
      console.log("Get metamask!");
      return setAppStatus("noMetamask");
    }
    try {
      const userDoc = {
        _type: "users",
        name: "Unnamed",
        _id: userWalletAddress,
        isProfileImageNft: false,
        profileImage:
          "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png",
        walletAddress: userWalletAddress,
      };
      await client.createIfNotExists(userDoc);
      setAppStatus("connected");
    } catch (err) {
      console.log(err);
      setAppStatus("error");
      router.push("/");
    }
  };

  const getProfileImageUrl = async (imageUri, isNft) => {
    if (isNft) {
      return `https://gateway.pinata.cloud/ipfs/${imageUri}`;
    } else {
      return imageUri;
    }
  };

  const fetchTweets = async (options = {}) => {
    const query = `*[_type == "tweets" && timestamp > $timestampBefore]{
      "author": author->{ name, profileImage, walletAddress, isProfileImageNft },
      tweet,
      timestamp,
      _id
    }| order(timestamp asc)`;
    const param = {
      timestampBefore: options.timestampBefore
        ? options.timestampBefore
        : new Date(0).toISOString(),
    };
    const sanityResponse = await client.fetch(query, param);
    
    sanityResponse.forEach(async (items) => {
      const ProfileImageUrl = await getProfileImageUrl(
        items.author.profileImage,
        items.author.isProfileImageNft
      );

      const newItem = {
        _id: items._id,
        tweet: items.tweet,
        timestamp: items.timestamp,
        author: {
          name: items.author.name,
          profileImage: ProfileImageUrl,
          walletAddress: items.author.walletAddress,
          isProfileImageNft: items.author.isProfileImageNft,
        },
      };
      setTweets((prev) => [newItem, ...prev]);
    });

  };

  const getUserData = async (userWalletAddress) => {
    const query = `
    *[_type == "users" && _id == "${userWalletAddress}"]{
      name,
      profileImage,
      isProfileImageNft,
      coverImage,
      walletAddress
    }
    `;

    const sanityResponse = await client.fetch(query);

    return {
      name: sanityResponse[0].name,
      profileImage: sanityResponse[0].profileImage,
      isProfileImageNft: sanityResponse[0].isProfileImageNft,
      coverImage: sanityResponse[0].coverImage,
      walletAddress: sanityResponse[0].walletAddress,
      tweets: sanityResponse[0].tweets,
    };
  };

  const getCurrentUserDetails = async () => {
    if (appStatus !== "connected") {
      return;
    }
    const query = `
    *[_type == "users" && _id == "${currentAccount}"]{
      "tweets" : tweets[]->{timestamp, tweet}| order(timestamp desc),
      name,
      profileImage,
      isProfileImageNft,
      coverImage,
      walletAddress
    }
    `;

    const sanityResponse = await client.fetch(query);

    const ProfileImageUrl = await getProfileImageUrl(
      sanityResponse[0].profileImage,
      sanityResponse[0].isProfileImageNft
    );

    setCurrentUser({
      name: sanityResponse[0].name,
      profileImage: ProfileImageUrl,
      isProfileImageNft: sanityResponse[0].isProfileImageNft,
      coverImage: sanityResponse[0].coverImage,
      walletAddress: sanityResponse[0].walletAddress,
      tweets: sanityResponse[0].tweets,
    });
  };

  const doTweet = async (tweetDoc) => {
    const tweetId = tweetDoc._id;

    const newItemT = {
      tweet: tweetDoc.tweet,
      timestamp: tweetDoc.timestamp,
      author: {
        name: currentUser.name,
        profileImage: currentUser.profileImage,
        walletAddress: currentAccount,
        isProfileImageNft: currentUser.isProfileImageNft,
      },
    };

    setTweets((prev) => [newItemT, ...prev]);

    await client.createIfNotExists(tweetDoc);

    await client
      .patch(currentAccount)
      .setIfMissing({ tweets: [] })
      .insert("after", "tweets[-1]", [
        {
          _key: tweetId,
          _ref: tweetId,
          _type: "reference",
        },
      ])
      .commit();
      await getCurrentUserDetails();

    // await fetchTweets();
  };

  return (
    <TwitterContext.Provider
      value={{
        appStatus,
        setAppStatus,
        currentAccount,
        connectToWallet,
        fetchTweets,
        tweets,
        getCurrentUserDetails,
        currentUser,
        doTweet,
      }}
    >
      {children}
    </TwitterContext.Provider>
  );
};
