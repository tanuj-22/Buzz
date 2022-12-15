import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { client } from "../lib/client";
import { compressImage, decryptImage } from "../lib/utility/encryption";
export const TwitterContext = createContext();
import { useTrends } from "../components/useTrends";

export const TwitterProvider = ({ children }) => {
  const [appStatus, setAppStatus] = useState("loading");
  const [currentAccount, setCurrentAccount] = useState("");
  const [tweets, setTweets] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [currentID, setCurrentID] = useState("");

  const router = useRouter();
  const trends = useTrends();

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    if (!currentAccount || appStatus !== "connected") return;
    getCurrentUserDetails(currentAccount);
    fetchTweets();
  }, [currentAccount, appStatus]);

  if (typeof window != "undefined" && window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      setCurrentAccount(accounts[0]);
      setAppStatus("connected");
      router.push("/");
    });
  }

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

  // const checkIfWalletIsConnected = async () => {
  //   if (!window.ethereum) {
  //     console.log("Make sure you have metamask!");
  //     return setAppStatus("noMetamask");
  //   }
  //   try {
  //     const addressArray = await window.ethereum.request({
  //       method: "eth_accounts",
  //     });
  //     if (addressArray.length > 0) {
  //       setCurrentAccount(addressArray[0]);
  //       createUserAccount(addressArray[0]);

  //       setAppStatus("connected");
  //     } else {
  //       // router.push("/");
  //       setAppStatus("notConnected");
  //       router.push("/");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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
        // createUserAccount(addressArray[0]);
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

  // const createUserAccount = async (userWalletAddress = currentAccount) => {
  //   if (!window.ethereum) {
  //     console.log("Get metamask!");
  //     return setAppStatus("noMetamask");
  //   }
  //   try {
  //     const userDoc = {
  //       _type: "users",
  //       name: "Unnamed",
  //       _id: userWalletAddress,
  //       isProfileImageNft: false,
  //       profileImage:
  //         "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png",
  //       walletAddress: userWalletAddress,
  //     };
  //     await client.createIfNotExists(userDoc);
  //     setAppStatus("connected");
  //   } catch (err) {
  //     console.log(err);
  //     setAppStatus("error");
  //     router.push("/");
  //   }
  // };

  const getProfileImageUrl = async (imageUri, isNft) => {
    return new Promise(async (resolve, reject) => {
      if (isNft) {
        const pinataResponse = await fetch(
          "https://gateway.pinata.cloud/ipfs/" + imageUri,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        ).catch((err) => {
          console.log(err);
          resolve(
            "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
          );
        });
        if (
          pinataResponse == undefined ||
          pinataResponse == null ||
          (pinataResponse && !pinataResponse.ok)
        ) {
          resolve(
            "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
          );
        }

        try {
          if (pinataResponse) {
            const pinataResponseJson = await pinataResponse.json();
            if (pinataResponseJson.access === "public") {
              resolve(`https://gateway.pinata.cloud/ipfs/${imageUri}`);
            }
            let imageurl = await decryptImage(pinataResponseJson.data);

            resolve(imageurl);
          }
        } catch (error) {
          console.log(error);
          resolve(
            "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
          );
        }

        // return `https://gateway.pinata.cloud/ipfs/${imageUri}`;
      } else {
        resolve(imageUri);
      }
      // resolve(imageUri);
      resolve(
        "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
      );
    });
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
    if (param.timestampBefore === new Date(0).toISOString()) {
      setTweets([]);
    }
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
      "tweets" : tweets[]->{timestamp, tweet,_id}| order(timestamp desc),
      name,
      profileImage,
      isProfileImageNft,
      coverImage,
      walletAddress,
      username,
      email,
      bio,
      location,
      _id

    }
    `;

    const sanityResponse = await client.fetch(query);
    if (sanityResponse.length === 0) {
      router.push("/?createProfile=true");
      setAppStatus("notConnected");
      return;
    }
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
      username: sanityResponse[0].username,
      email: sanityResponse[0].email,
      bio: sanityResponse[0].bio,
      location: sanityResponse[0].location,
      _id: sanityResponse[0]._id,
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

  const uploadAsset = async (file) => {
    const res = await client.assets.upload("image", file, {
      contentType: file.type,
      filename: file.name,
    });

    return res;
  };

  const updateProfile = async (profileDoc) => {
    if (profileDoc === undefined || profileDoc === null || profileDoc === {}) {
      alert("Please fill all the fields");
      return;
    }
    const fieldUpdates = {};
    for (let key in profileDoc) {
      let value = profileDoc[key];
      if (value !== currentUser[key]) {
        if (key === "profileImage" || key === "coverImage") {
          var blob = await fetch(value).then((r) => r.blob());
          const file = new File([blob], currentUser.name, { type: blob.type });
          const compressedFile = await compressImage(file);
          const asset = await uploadAsset(compressedFile);
          value = asset.url;
        }
        fieldUpdates[key] = value;
      }
    }

    if (fieldUpdates === {}) {
      router.push("/profile");
    }
    await client.patch(currentUser._id).set(fieldUpdates).commit();
    await getCurrentUserDetails();
    router.push("/profile");
  };
  const checkUniqueUsername = async (username) => {
    const query = `
    *[_type == "users" && username == "${username}"]{
      username
    }
    `;

    const sanityResponse = await client.fetch(query);
    if (sanityResponse.length === 0) {
      return true;
    }
    return false;
  };
  const createUserProfile = async (profileDoc) => {
    if (profileDoc === undefined || profileDoc === null || profileDoc === {}) {
      alert("Please fill all the fields");
      return;
    }
    if (
      profileDoc.username === undefined ||
      profileDoc.username === null ||
      profileDoc.username === ""
    ) {
      alert("Please fill all the fields");
      return;
    }
    setAppStatus("loading");
    const fieldUpdates = {};
    for (let key in profileDoc) {
      let value = profileDoc[key];
      if (key === "profileImage" || key === "coverImage") {
        var blob = await fetch(value).then((r) => r.blob());
        const file = new File([blob], blob.name, { type: blob.type });
        const compressedFile = await compressImage(file);
        const asset = await uploadAsset(compressedFile);
        value = asset.url;
      } else if (key === "username") {
        const isUnique = await checkUniqueUsername(value);
        if (!isUnique) {
          alert("Username is already taken");
          setAppStatus("notConnected");
          return;
        }
      }
      fieldUpdates[key] = value;
    }
    await connectWalletAfterSignUp(fieldUpdates);
  };

  const connectWalletAfterSignUp = async (profileDoc) => {
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
        let newUserDetails = {};
        newUserDetails = {
          ...profileDoc,
          walletAddress: addressArray[0],
        };
        // console.log(newUserDetails);
        await createUserAccountProfile(newUserDetails);
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

  const createUserAccountProfile = async (profileDoc) => {
    try {
      const userDoc = {
        _type: "users",
        name:
          profileDoc.name && profileDoc.name !== ""
            ? profileDoc.name
            : "Unnamed",
        // _id: userWalletAddress,
        isProfileImageNft: false,
        profileImage: profileDoc.profileImage
          ? profileDoc.profileImage
          : "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png",
        location: profileDoc.location ? profileDoc.location : "",
        bio: profileDoc.bio ? profileDoc.bio : "",
        username: profileDoc.username ? profileDoc.username : "",
        coverImage: profileDoc.coverImage ? profileDoc.coverImage : "",
        walletAddress: profileDoc.walletAddress ? profileDoc.walletAddress : "",
        _id: profileDoc.walletAddress ? profileDoc.walletAddress : "user.",
      };

      await client.create(userDoc);
      setCurrentAccount(profileDoc.walletAddress);
      setAppStatus("connected");
    } catch (err) {
      console.log(err);
      setAppStatus("error");
      router.push("/");
    }
  };

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
        updateProfile,
        createUserProfile,
        trends
      }}
    >
      {children}
    </TwitterContext.Provider>
  );
};
