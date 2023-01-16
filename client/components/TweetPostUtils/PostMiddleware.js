import React, { useContext, useEffect, useState } from "react";
import { getProfileImageUrl } from "../../context/functions/tweetsUtility";
import { TwitterContext } from "../../context/TwitterContext";
import Post from "../Post";

const PostMiddleware = ({
  tweetId,
  displayName,
  userName,
  avatar,
  text,
  isProfileImageNft,
  timestamp,
  public_metrics,
  isLiked,
  isRetweeted,
  referenced_tweets,
  authorID,
}) => {
  const { currentUser } = useContext(TwitterContext);
  //   const [dataUpdated, setDataUpdated] = useState(false);

  const [twitterPostData, settwitterPostData] = useState({
    tweetId,
    displayName,
    userName,
    avatar,
    text,
    isProfileImageNft,
    timestamp,
    public_metrics,
    isLiked,
    isRetweeted,
    referenced_tweets,
    authorID,
    superScript: false,
    superScriptText: "",
    superScriptUser: displayName,
    referenced_tweet_child: null,
  });

  useEffect(() => {
    if (!referenced_tweets || referenced_tweets.length === 0) return;

    (async () => {
      let ProfileImageUrl = await getProfileImageUrl(
        referenced_tweets.at(-1)?.id?.author?.profileImage,
        referenced_tweets.at(-1)?.id?.author?.isProfileImageNft
      );

      if (referenced_tweets.at(-1)?.type === "retweet") {
        settwitterPostData({
          ...twitterPostData,
          superScript: true,
          superScriptText: "Retweeted",
          superScriptUser: authorID === currentUser?._id ? "You" : displayName,
          tweetId: referenced_tweets.at(-1)?.id?._id,
          displayName: referenced_tweets.at(-1)?.id?.author?.name,
          userName: referenced_tweets.at(-1)?.id?.author?.username,
          avatar: ProfileImageUrl,
          text: referenced_tweets.at(-1)?.id?.tweet,
          isProfileImageNft:
            referenced_tweets.at(-1)?.id?.author?.isProfileImageNft,
          timestamp: referenced_tweets.at(-1)?.id?.timestamp,
          public_metrics: {
            like_count:
              referenced_tweets.at(-1)?.id?.public_metrics?.like_count || 0,
            quote_count:
              referenced_tweets.at(-1)?.id?.public_metrics?.quote_count || 0,
            reply_count:
              referenced_tweets.at(-1)?.id?.public_metrics?.reply_count || 0,
            retweet_count:
              referenced_tweets.at(-1)?.id?.public_metrics?.retweet_count || 0,
          },
          isLiked:
            currentUser?.activities?.likedTweets.find(
              (item) => item._key === referenced_tweets.at(-1)?.id?._id
            ) !== undefined
              ? true
              : false,
          isRetweeted:
            currentUser?.activities?.retweetedTweets.find(
              (item) => item._key === referenced_tweets.at(-1)?.id?._id
            ) !== undefined
              ? true
              : false,

          referenced_tweets: referenced_tweets.at(-1)?.id?.referenced_tweets,
          authorID: referenced_tweets.at(-1)?.id?.author?._id,
          referenced_tweet_child: tweetId
        });
      } else if (referenced_tweets.at(-1)?.type === "replied_to") {
        settwitterPostData({
          ...twitterPostData,
          superScript: true,
          superScriptText: "Replied",
          superScriptUser: authorID === currentUser?._id ? "You" : displayName,
          
        });
      }
    })();

    return () => {};
  }, [referenced_tweets]);

  return <Post {...twitterPostData} />;
};

export default PostMiddleware;
