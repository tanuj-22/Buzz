import { client } from "../../lib/client";

export const actionOnTweet = async (action, tweetId, userId) => {
    

    
  if (tweetId === undefined || userId === null) return;
  if (action === "like") {

    if(isActionPossible("like", tweetId, userId) === false) return;

    const res = await client
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
      ])
      .commit();
  }
};

export const fetchTweets = async (options = {}) => {
  const query = `*[_type == "tweets" && timestamp > $timestampBefore]{
      "author": author->{ name, profileImage, walletAddress, isProfileImageNft },
      tweet,
      timestamp,
      _id,
      public_metrics
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
      },
      public_metrics: items.public_metrics,
    };
    return newItem;
    // setTweets((prev) => [newItem, ...prev]);
  });
  let result = await Promise.all(arr);

  result.forEach((item) => {
    setTweets((prev) => [item, ...prev]);
  });
};

export const doTweet = async (tweetDoc) => {
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

export const getProfileImageUrl = async (imageUri, isNft) => {
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
