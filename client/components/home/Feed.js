import { BsStars } from "react-icons/bs";
import TweetBox from "./TweetBox";
import Post from "../Post";
import { useContext, useEffect } from "react";
import { TwitterContext } from "../../context/TwitterContext";
import { client } from "../../lib/client";
const style = {
  // wrapper: `flex-[2] border-r border-l border-primaryContrast dark:border-primaryContrastDark`,
  wrapper: `flex-[1.7] border-r border-l border-primaryContrast dark:border-primaryContrastDark max-w-2xl  sm:ml-[80px] lg:ml-[24%] `,
  header: `border-b border-primaryContrast z-10 dark:border-primaryContrastDark sm:border-0  sm:ml-0 sticky top-0 bg-primaryBgl dark:bg-primaryBgd p-4 flex justify-between items-center`,
  headerTitle: `text-xl font-bold ml-12 sm:ml-0`,
};

function Feed() {
  const { tweets, fetchTweets } = useContext(TwitterContext);

  

  return (
    <div className={`${style.wrapper}`}>
      <div className={style.header}>
        <div className={style.headerTitle}>Home</div>
        <BsStars />
      </div>
      <TweetBox />
      {tweets.map((tweet, index) => (
        <Post
          key={index}
          displayName={tweet.author.name}
          userName={`${tweet.author.walletAddress.slice(
            0,
            4
          )}...${tweet.author.walletAddress.slice(-4)}`}
          avatar={tweet.author.profileImage}
          text={tweet.tweet}
          isProfileImageNft={tweet.author.isProfileImageNft}
          timestamp={tweet.timestamp}
        />
      ))}
    </div>
  );
}

export default Feed;
