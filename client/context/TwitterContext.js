import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { client } from "../lib/client";
import { compressImage, decryptImage } from "../lib/utility/encryption";
export const TwitterContext = createContext();
import { useTrends } from "../components/useTrends";
import { actionOnTweet } from "./functions/tweetsUtility";

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
    // getCurrentUserDetails(currentAccount);
    // fetchTweets();
    (async () => {
      await getCurrentUserDetails().then(() => {
        fetchTweets();
      });
    })();
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
    // const listenerQuery = ` *[ _type == "tweets"  ]`;

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
        // fetchTweets();
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
        await fetch("https://ipfs.io/ipfs/" + imageUri, {
          method: "GET",
        })
          .then(async (pinataResponse) => {
            if (
              typeof pinataResponse == "undefined" ||
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

                if (
                  pinataResponseJson.data === undefined ||
                  pinataResponseJson.data == null
                ) {
                  return resolve(
                    "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
                  );
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
          })
          .catch((err) => {
            console.log(err);
            resolve(
              "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
            );
          });

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

  // const getProfileImageUrl = async (imageUri, isNft) => {

  //     if (isNft) {
  //       const pinataResponse = await fetch(
  //         "https://gateway.pinata.cloud/ipfs/" + imageUri,
  //         {
  //           method: "GET",
  //           headers: {
  //             Accept: "application/json",
  //           },
  //         }
  //       ).catch((err) => {
  //         console.log(err);
  //         return(
  //           "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
  //         );
  //       });
  //       if (
  //         pinataResponse == undefined ||
  //         pinataResponse == null ||
  //         (pinataResponse && !pinataResponse.ok)
  //       ) {
  //         return(
  //           "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
  //         );
  //       }

  //       try {
  //         if (pinataResponse) {
  //           const pinataResponseJson = await pinataResponse.json();
  //           if (pinataResponseJson.access === "public") {
  //             return(`https://gateway.pinata.cloud/ipfs/${imageUri}`);
  //           }
  //           let imageurl = await decryptImage(pinataResponseJson.data);

  //           return (imageurl);
  //         }
  //       } catch (error) {
  //         console.log(error);
  //         return(
  //           "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
  //         );
  //       }

  //       // return `https://gateway.pinata.cloud/ipfs/${imageUri}`;
  //     } else {
  //       return(imageUri);
  //     }
  //     // resolve(imageUri);
  //     return(
  //       "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
  //     );

  // };

  //   *[_type == "tweets" && referenced_tweets != NULL]{
  //     "author": author->{ name, profileImage, walletAddress, isProfileImageNft },
  //     tweet,
  //     timestamp,
  //     _id,
  //     public_metrics,
  //     likedBy,
  //     retweetedBy,
  //     repliedBy,
  //     quotedBy,
  //     attachments,
  //     entities,
  //     "referenced_tweets" : referenced_tweets[]{
  // type,
  // "tweet" : id->{
  // "author": author->{ name, profileImage, walletAddress, isProfileImageNft },
  //     tweet,
  //     timestamp,
  //     _id,
  //     public_metrics,
  //     likedBy,
  //     retweetedBy,
  //     repliedBy,
  //     quotedBy,
  //     attachments,
  //     entities,
  // }
  // }

  //   }| order(timestamp asc)

  const fetchTweets = async (options = {}) => {
    const query = `*[_type == "tweets" && timestamp > $timestampBefore]{
      "author": author->{ name, profileImage, walletAddress, isProfileImageNft,_id,username },
      tweet,
      timestamp,
      _id,
      public_metrics,
      likedBy,
      retweetedBy,
      repliedBy,
      quotedBy,
      attachments,
      entities,
      "referenced_tweets" : referenced_tweets[]{
        type,
         id->{
        ...,
        "author": author->{ name, profileImage, walletAddress, isProfileImageNft,_id,username }
        
      }
           
         
      }
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
    let arr = sanityResponse.map(async (items) => {
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
          _id: items.author._id,
          username: items.author.username,
        },
        public_metrics: items.public_metrics,
        likedBy: items.likedBy,
        retweetedBy: items.retweetedBy,
        repliedBy: items.repliedBy,
        quotedBy: items.quotedBy,
        attachments: items.attachments,
        entities: items.entities,
        referenced_tweets: items.referenced_tweets,
      };
      return newItem;
      // setTweets((prev) => [newItem, ...prev]);
    });
    let result = await Promise.all(arr);

    result.forEach((item) => {
      setTweets((prev) => [item, ...prev]);
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

    // "tweets" : tweets[]->{timestamp, tweet,_id}| order(timestamp desc),
    const query = `
    *[_type == "users" && _id == "${currentAccount}"]{
      "tweets" : tweets[]->{
        "author": author->{ name, profileImage, walletAddress, isProfileImageNft,_id,username },
        tweet,
        timestamp,
        _id,
        public_metrics,
        likedBy,
        retweetedBy,
        repliedBy,
        quotedBy,
        attachments,
        entities,
        "referenced_tweets" : referenced_tweets[]{
          type,
           id->{
          ...,
          "author": author->{ name, profileImage, walletAddress, isProfileImageNft,_id,username }
          
        }
             
           
        }
      }| order(timestamp desc),
      name,
      profileImage,
      isProfileImageNft,
      coverImage,
      walletAddress,
      username,
      email,
      bio,
      location,
      _id,
      activities,

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
      activities: sanityResponse[0].activities,
    });
  };

  const doTweetWithReference = async (tweetDoc, tweetDocDisplay) => {
    const tweetId = tweetDoc._id;

    let newTweetDoc = {
      _type: "tweets",
      tweet: tweetDoc.tweet,
      timestamp: new Date(Date.now()).toISOString(),
      author: {
        _type: "reference",
        _ref: currentUser._id,
        _key: tweetId,
      },
      public_metrics: {
        retweet_count: 0,
        reply_count: 0,
        like_count: 0,
        quote_count: 0,
      },
      _id: tweetId,
      attachments: tweetDoc.attachments ? tweetDoc.attachments : [],
      entities: tweetDoc.entities ? tweetDoc.entities : {},
      likedBy: [],
      retweetedBy: [],
      repliedBy: [],
      quotedBy: [],
      referenced_tweets: tweetDoc.referenced_tweets
        ? tweetDoc.referenced_tweets
        : [],
    };

    const newItemT = {
      tweet: tweetDocDisplay.tweet,
      timestamp: new Date(Date.now()).toISOString(),
      author: {
        name: currentUser.name,
        profileImage: currentUser.profileImage,
        walletAddress: currentAccount,
        isProfileImageNft: currentUser.isProfileImageNft,
        _id: currentUser._id,
      },
      public_metrics: {
        retweet_count: 0,
        reply_count: 0,
        like_count: 0,
        quote_count: 0,
      },
      _id: tweetId,
      attachments: tweetDocDisplay.attachments
        ? tweetDocDisplay.attachments
        : [],
      entities: tweetDocDisplay.entities ? tweetDocDisplay.entities : {},
      likedBy: [],
      retweetedBy: [],
      repliedBy: [],
      quotedBy: [],
      referenced_tweets: tweetDocDisplay.referenced_tweets
        ? tweetDocDisplay.referenced_tweets
        : [],
    };

    // setTweets((prev) => [newItemT, ...prev]);

    // await client.createIfNotExists(tweetDoc);
    await client.createIfNotExists(newTweetDoc);

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
  };

  const doTweet = async (tweetDoc) => {
    const tweetId = tweetDoc._id;

    let newTweetDoc = {
      _type: "tweets",
      tweet: tweetDoc.tweet,
      timestamp: new Date(Date.now()).toISOString(),
      author: {
        _type: "reference",
        _ref: currentAccount,
        _key: tweetId,
      },
      public_metrics: {
        retweet_count: 0,
        reply_count: 0,
        like_count: 0,
        quote_count: 0,
      },
      _id: tweetId,
      attachments: tweetDoc.attachments ? tweetDoc.attachments : [],
      entities: tweetDoc.entities ? tweetDoc.entities : {},
      likedBy: [],
      retweetedBy: [],
      repliedBy: [],
      quotedBy: [],
      referenced_tweets: tweetDoc.referenced_tweets
        ? tweetDoc.referenced_tweets
        : [],
    };

    const newItemT = {
      tweet: tweetDoc.tweet,
      timestamp: new Date(Date.now()).toISOString(),
      author: {
        name: currentUser.name,
        profileImage: currentUser.profileImage,
        walletAddress: currentAccount,
        isProfileImageNft: currentUser.isProfileImageNft,
      },
      public_metrics: {
        retweet_count: 0,
        reply_count: 0,
        like_count: 0,
        quote_count: 0,
      },
      _id: tweetId,
      attachments: tweetDoc.attachments ? tweetDoc.attachments : [],
      entities: tweetDoc.entities ? tweetDoc.entities : {},
      likedBy: [],
      retweetedBy: [],
      repliedBy: [],
      quotedBy: [],
      referenced_tweets: tweetDoc.referenced_tweets
        ? tweetDoc.referenced_tweets
        : [],
    };

    setTweets((prev) => [newItemT, ...prev]);

    // await client.createIfNotExists(tweetDoc);
    await client.createIfNotExists(newTweetDoc);

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

  // const removeTweet = async (tweetId) => {
  //   await client.delete(tweetId);
  //   await client
  //     .patch(currentAccount)
  //     .unset([`tweets[_ref == "${tweetId}"]`])
  //     .commit();
  //   await getCurrentUserDetails();
  // };

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

  const isActionPossible = async (action, tweetId, userId) => {
    if (action === "like") {
      const query = `
      *[_type == "users" && _id == "${userId}"]{
        "liked" : activities.likedTweets
      }
      `;
      const sanityResponse = await client.fetch(query);
      const currentUserLikedActivities = sanityResponse[0].liked;

      const response = currentUserLikedActivities.find(
        (tweet) => tweet._key === tweetId
      );

      if (response === undefined) return true;
      else return false;
    } else if (action === "unlike") {
      const query = `
      *[_type == "users" && _id == "${userId}"]{
        "liked" : activities.likedTweets
      }
      `;
      const sanityResponse = await client.fetch(query);
      const currentUserLikedActivities = sanityResponse[0].liked;

      const response = currentUserLikedActivities.find(
        (tweet) => tweet._key === tweetId
      );

      if (response === undefined) return false;
      else return true;
    } else if (action === "retweet") {
      const query = `
      *[_type == "users" && _id == "${userId}"]{
        "retweeted" : activities.retweetedTweets
      }
      `;
      const sanityResponse = await client.fetch(query);
      const currentUserRetweetedActivities = sanityResponse[0].retweeted;

      const response = currentUserRetweetedActivities.find(
        (tweet) => tweet._key === tweetId
      );

      if (response === undefined) return true;
      else return false;
    } else if (action === "unretweet") {
      const query = `
      *[_type == "users" && _id == "${userId}"]{
        "retweeted" : activities.retweetedTweets
      }
      `;
      const sanityResponse = await client.fetch(query);
      const currentUserRetweetedActivities = sanityResponse[0].retweeted;

      const response = currentUserRetweetedActivities.find(
        (tweet) => tweet._key === tweetId
      );

      if (response === undefined) return false;
      else return true;
    }
  };

  const undoRetweetFromParent = async (tweetId, userId) => {
    const getTweetFromUser = await client.fetch(
      `*[_type == "tweets" && author._ref == "${userId}" ]{
        _id,
        referenced_tweets
      }
      `
    );
    const response = getTweetFromUser
      .filter((tweet) => tweet.referenced_tweets !== undefined)
      .find((tweet) => tweet.referenced_tweets.at(-1)._key === tweetId);

    if (response?._id)
      return actionOnTweet("unretweet", tweetId, userId, response._id);
  };

  const actionOnTweet = async (
    action,
    tweetId,
    userId,
    referenced_tweet_child
  ) => {
    if (tweetId === undefined || tweetId === null) return;

    if (action === "like") {
      const userLikedTweetsAddPatch = client
        .patch(userId)
        .setIfMissing({
          activities: {
            likedTweets: [],
            retweetedTweets: [],
            repliedTweets: [],
            quotedTweets: [],
          },
        })
        .insert("after", "activities.likedTweets[-1]", [
          { _key: tweetId, _ref: tweetId, _type: "reference" },
        ]);

      const tweetLikedByAddPatch = client
        .patch(tweetId)
        .setIfMissing({ likedBy: [] })
        .insert("after", "likedBy[-1]", [
          {
            _key: currentUser._id,
            _ref: currentUser._id,
            _type: "reference",
          },
        ]);

      const tweetLikedCounterIncPatch = client
        .patch(tweetId)
        .setIfMissing({ "public_metrics.like_count": 0 })
        .inc({ "public_metrics.like_count": 1 });

      const res = isActionPossible("like", tweetId, userId).then(
        async (res) => {
          if (res === false) return;
          else {
            await client
              .transaction()
              .patch(userLikedTweetsAddPatch)
              .patch(tweetLikedByAddPatch)
              .patch(tweetLikedCounterIncPatch)
              .commit();
          }
        }
      );
    } else if (action === "unlike") {
      const userLikedTweetsRemovePatch = client
        .patch(userId)
        .unset([`activities.likedTweets[_key == "${tweetId}"]`]);

      const tweetLikedByRemovePatch = client
        .patch(tweetId)
        .unset([`likedBy[_key == "${userId}"]`]);

      const tweetLikedCounterDecPatch = client
        .patch(tweetId)
        .inc({ "public_metrics.like_count": -1 });

      const res = isActionPossible("unlike", tweetId, userId).then(
        async (res) => {
          if (res === false) return;
          else {
            await client
              .transaction()
              .patch(userLikedTweetsRemovePatch)
              .patch(tweetLikedByRemovePatch)
              .patch(tweetLikedCounterDecPatch)
              .commit();
          }
        }
      );
    } else if (action === "retweet") {
      const userRetweetedTweetsAddPatch = client
        .patch(userId)
        .setIfMissing({
          activities: {
            likedTweets: [],
            retweetedTweets: [],
            repliedTweets: [],
            quotedTweets: [],
          },
        })
        .insert("after", "activities.retweetedTweets[-1]", [
          { _key: tweetId, _ref: tweetId, _type: "reference" },
        ]);

      const tweetRetweetedByAddPatch = client
        .patch(tweetId)
        .setIfMissing({ retweetedBy: [] })
        .insert("after", "retweetedBy[-1]", [
          { _key: currentUser._id, _ref: currentUser._id, _type: "reference" },
        ]);

      const tweetRetweetedCounterIncPatch = client
        .patch(tweetId)
        .setIfMissing({ "public_metrics.retweet_count": 0 })
        .inc({ "public_metrics.retweet_count": 1 });

      const res = isActionPossible("retweet", tweetId, userId).then(
        async (res) => {
          if (res === false) return;
          else {
            await client
              .transaction()
              .patch(userRetweetedTweetsAddPatch)
              .patch(tweetRetweetedByAddPatch)
              .patch(tweetRetweetedCounterIncPatch)
              .commit();

            let refTweet = tweets.find((tweet) => tweet._id === tweetId);
            let refTweetRefIterable = refTweet?.referenced_tweets
              ? true
              : false;
            let refTweetObj = {
              type: "retweet",
              _key: refTweet._id,
              id: {
                _ref: refTweet._id,
                _type: "reference",
              },
            };
            let tweetDoc = {
              _id: `${currentUser._id}_${Date.now()}`,
              _type: "tweet",
              tweet: refTweet.tweet,
              timestamp: new Date(Date.now()).toISOString(),
              author: {
                _type: "reference",
                _ref: currentUser._id,
                _key: tweetId,
              },
              referenced_tweets: refTweetRefIterable
                ? [...refTweet.referenced_tweets, refTweetObj]
                : [refTweetObj],
            };

            let refTweetObjDisplay = {
              type: "retweet",
              _key: refTweet._id,
              id: {
                ...refTweet,
              },
            };

            let tweetDocDisplay = {
              ...tweetDoc,
              referenced_tweets: refTweetRefIterable
                ? [...refTweet.referenced_tweets, refTweetObjDisplay]
                : [refTweetObjDisplay],
            };

            await doTweetWithReference(tweetDoc, tweetDocDisplay);
          }
        }
      );
    } else if (action === "unretweet") {
      // const userRetweetedTweetsRemovePatch = client
      //   .patch(userId)
      //   .unset([`activities.retweetedTweets[_key == "${tweetId}"]`]);

      // const tweetRetweetedByRemovePatch = client
      //   .patch(tweetId)
      //   .unset([`retweetedBy[_key == "${userId}"]`]);

      // const tweetRetweetedCounterDecPatch = client
      //   .patch(tweetId)
      //   .inc({ "public_metrics.retweet_count": -1 });
      // await client
      //   .transaction()
      //   .patch(userRetweetedTweetsRemovePatch)
      //   .patch(tweetRetweetedByRemovePatch)
      //   .patch(tweetRetweetedCounterDecPatch)
      //   .commit();

      // delete the retweet from the user's tweets collection pending

      if (!referenced_tweet_child)
        return undoRetweetFromParent(tweetId, userId);

      // console.log("unretweet", tweetId, userId, referenced_tweet_child);
      const userRetweetedTweetsRemovePatch = client
        .patch(userId)
        .unset([`activities.retweetedTweets[_key == "${tweetId}"]`]);

      const tweetRetweetedByRemovePatch = client
        .patch(tweetId)
        .unset([`retweetedBy[_key == "${userId}"]`]);

      const tweetRetweetedCounterDecPatch = client
        .patch(tweetId)
        .inc({ "public_metrics.retweet_count": -1 });

      const removeRetweetFromUserTweets = client
        .patch(userId)
        .unset([`tweets[_key == "${referenced_tweet_child}"]`]);

      const removeTweetRemoveRef = client
        .patch(referenced_tweet_child)
        .unset([`referenced_tweets[_key == "${tweetId}"]`]);

      const res = isActionPossible("unretweet", tweetId, userId).then(
        async (res) => {
          if (res === false) return;
          else {
            await client
              .transaction()
              .patch(removeRetweetFromUserTweets)
              .patch(userRetweetedTweetsRemovePatch)
              .patch(tweetRetweetedByRemovePatch)
              .patch(tweetRetweetedCounterDecPatch)
              .patch(removeTweetRemoveRef)
              .commit();

            await client
              .transaction()
              .delete(referenced_tweet_child)
              .commit()
              .then((res) => {
                setTweets((prevTweets) => {
                  let newTweets = prevTweets.filter(
                    (tweet) => tweet._id !== referenced_tweet_child
                  );
                  return newTweets;
                });
              })
              .catch((err) => {
                console.error(err);
              });
          }
        }
      );
    }

    await getCurrentUserDetails();
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
        trends,
        actionOnTweet,
      }}
    >
      {children}
    </TwitterContext.Provider>
  );
};
