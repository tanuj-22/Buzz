import { BsStars } from "react-icons/bs";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import TweetBox from "./TweetBox";
import PostMiddleware from "../TweetPostUtils/PostMiddleware";
import { useContext, useEffect, useState } from "react";
import { TwitterContext } from "../../context/TwitterContext";
import { useTheme } from "next-themes";
import Loader from "../Loader";
const style = {
  // wrapper: `flex-[2] border-r border-l border-primaryContrast dark:border-primaryContrastDark`,
  wrapper: `pb-8 sm:pb-0 flex-[1.7] border-r border-l border-primaryContrast dark:border-primaryContrastDark max-w-2xl  sm:ml-[80px] lg:ml-[24%] `,
  header: `border-b border-primaryContrast z-10 dark:border-primaryContrastDark sm:border-0  sm:ml-0 sticky top-0 bg-white/[0.7] dark:bg-black/[0.7] backdrop-blur-sm p-4 flex justify-between items-center`,
  headerTitle: `text-xl font-bold ml-12 sm:ml-0`,
  headerIcons: `flex justify-between`,
  icons: "mx-2 cursor-pointer",
};

function Feed() {
  const { tweets, currentUser, getCurrentUserDetails } =
    useContext(TwitterContext);
  const { theme, setTheme } = useTheme();

  return (
    <div className={`${style.wrapper}`}>
      <div className={style.header}>
        <div className={style.headerTitle}>Home</div>
        <div className={style.headerIcons}>
          {/* <BsStars /> */}
          <div onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? (
              <BsSunFill className={style.icons} />
            ) : (
              <BsMoonFill className={style.icons} />
            )}
          </div>
        </div>
      </div>
      <TweetBox />
      {tweets.length === 0 && <Loader />}
      {tweets.length != 0 &&
        tweets.map((tweet, index) => (
          <PostMiddleware
            key={tweet._id}
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
}

export default Feed;
