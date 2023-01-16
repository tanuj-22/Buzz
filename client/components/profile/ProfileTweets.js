import React from "react";
import PostMiddleware from "../TweetPostUtils/PostMiddleware";
import { useContext } from "react";
import { TwitterContext } from "../../context/TwitterContext";
const style = {
  wrapper: `no-scrollbar`,
  header: `sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center`,
  headerTitle: `text-xl font-bold`,
};

const ProfileTweets = () => {
  const { currentAccount, currentUser, tweets } = useContext(TwitterContext);

  return (
    <div className={style.wrapper}>
      {currentUser.tweets &&
        currentUser.tweets.map((tweet, index) => (
          <PostMiddleware
            key={index}
            tweetId={tweet._id}
            displayName={tweet.author.name}
            authorID={tweet.author._id}
            userName={tweet.author.username}
            avatar={tweet.author.profileImage}
            text={tweet.tweet}
            isProfileImageNft={tweet.author.isProfileImageNft}
            timestamp={tweet.timestamp}
            public_metrics={tweet.public_metrics}
            isLiked={
              currentUser?.activities?.likedTweets.find(
                (item) => item._key === tweet._id
              ) !== undefined
                ? true
                : false
            }
            isRetweeted={
              currentUser?.activities?.retweetedTweets.find(
                (item) => item._key === tweet._id
              ) !== undefined
                ? true
                : false
            }
            referenced_tweets={tweet.referenced_tweets}
          />
        ))}
    </div>
  );
};

export default ProfileTweets;
