import { BsStars } from "react-icons/bs";
import TweetBox from "./TweetBox";
import Post from "../Post";

const style = {
  // wrapper: `flex-[2] border-r border-l border-[#38444d] `,
  wrapper: `flex-grow border-r border-l border-[#38444d] max-w-2xl  sm:ml-[80px] xl:ml-[370px] `,
  header: `border-b border-[#38444d] sm:border-0  sm:ml-0 sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center`,
  headerTitle: `text-xl font-bold ml-12 sm:ml-0`,
};

const tweets = [
  {
    displayName: "John Doe",
    userName: "johndoe",
    avatar:
      "https://bafybeihf62ck6r76x2b3u5ll5lurq4wpcoc25puv5armmxt7afpljnixlu.ipfs.w3s.link/profile5.png",
    text: "gm",
    isProfileImageNft: false,
    timestamp: "2022-03-21T18:30:00.000Z",
  },
  {
    displayName: "John Doe",
    userName: "johndoe",
    avatar:
      "https://bafybeihf62ck6r76x2b3u5ll5lurq4wpcoc25puv5armmxt7afpljnixlu.ipfs.w3s.link/profile5.png",
    text: "gm",
    isProfileImageNft: false,
    timestamp: "2021-03-21T18:30:00.000Z",
  },
  {
    displayName: "John Doe",
    userName: "johndoe",
    avatar:
      "https://bafybeihf62ck6r76x2b3u5ll5lurq4wpcoc25puv5armmxt7afpljnixlu.ipfs.w3s.link/profile5.png",
    text: "gm",
    isProfileImageNft: false,
    timestamp: "2021-03-21T18:30:00.000Z",
  },
  {
    displayName: "John Doe",
    userName: "johndoe",
    avatar:
      "https://bafybeihf62ck6r76x2b3u5ll5lurq4wpcoc25puv5armmxt7afpljnixlu.ipfs.w3s.link/profile5.png",
    text: "gm",
    isProfileImageNft: false,
    timestamp: "2021-03-21T18:30:00.000Z",
  },
];

function Feed() {
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
          displayName={tweet.displayName}
          userName={`${tweet.userName.slice(0, 4)}...${tweet.userName.slice(
            -4
          )}`}
          avatar={tweet.avatar}
          text={tweet.text}
          isProfileImageNft={tweet.isProfileImageNft}
          timestamp={tweet.timestamp}
        />
      ))}
    </div>
  );
}

export default Feed;
