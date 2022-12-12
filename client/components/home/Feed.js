import { BsStars } from "react-icons/bs";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import TweetBox from "./TweetBox";
import Post from "../Post";
import { useContext, useEffect } from "react";
import { TwitterContext } from "../../context/TwitterContext";
import { client } from "../../lib/client";
import { useTheme } from "next-themes";
const style = {
  // wrapper: `flex-[2] border-r border-l border-primaryContrast dark:border-primaryContrastDark`,
  wrapper: `pb-8 sm:pb-0 flex-[1.7] border-r border-l border-primaryContrast dark:border-primaryContrastDark max-w-2xl  sm:ml-[80px] lg:ml-[24%] `,
  header: `border-b border-primaryContrast z-10 dark:border-primaryContrastDark sm:border-0  sm:ml-0 sticky top-0 bg-primaryBgl dark:bg-primaryBgd p-4 flex justify-between items-center`,
  headerTitle: `text-xl font-bold ml-12 sm:ml-0`,
  headerIcons: `flex justify-between`,
  icons : 'mx-2 cursor-pointer'
};

function Feed() {
  const { tweets, fetchTweets } = useContext(TwitterContext);
  const { theme, setTheme } = useTheme();
  

  
  return (
    <div className={`${style.wrapper}`}>
      <div className={style.header}>
        <div className={style.headerTitle}>Home</div>
        <div className={style.headerIcons}>
          <BsStars />
          <div onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <BsSunFill className={style.icons}/> : <BsMoonFill className={style.icons}/>}
          </div>
        </div>
      </div>
      <TweetBox />
      {tweets.map((tweet, index) => (
        <Post
          key={index}
          displayName={tweet.author.name}
          userName={tweet.author.walletAddress}
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
