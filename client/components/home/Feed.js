import { BsStars } from "react-icons/bs";
import TweetBox from "./TweetBox";
import Post from "../Post";

const style = {
  // wrapper: `flex-[2] border-r border-l border-primaryContrast dark:border-primaryContrastDark`,
  wrapper: `flex-[1.7] border-r border-l border-primaryContrast dark:border-primaryContrastDark max-w-2xl  sm:ml-[80px] lg:ml-[24%] `,
  header: `border-b border-primaryContrast dark:border-primaryContrastDark sm:border-0  sm:ml-0 sticky top-0 bg-primaryBgl dark:bg-primaryBgd z-10 p-4 flex justify-between items-center`,
  headerTitle: `text-xl font-bold ml-12 sm:ml-0`,
};

const tweets = [
  {
    displayName: "John Doe",
    userName: "johndoe",
    avatar:
      "https://bafybeice3lmabcb7z4kesudbv7mmtnhklvetuz3y5utcwdmuwfpkksngza.ipfs.w3s.link/profile10.jpg",
    text: "gm",
    isProfileImageNft: false,
    timestamp: "2022-03-21T18:30:00.000Z",
  },
  {
    displayName: "John Doe",
    userName: "johndoe",
    avatar:
      "https://bafybeigxwfhwwp6szduoq6qvoqro24524b6m7vqja5gnzh2qsiauh2gpre.ipfs.w3s.link/profile9.png",
    text: "gm",
    isProfileImageNft: false,
    timestamp: "2021-03-21T18:30:00.000Z",
  },
  {
    displayName: "John Doe",
    userName: "johndoe",
    avatar:
      "https://bafybeice3lmabcb7z4kesudbv7mmtnhklvetuz3y5utcwdmuwfpkksngza.ipfs.w3s.link/profile10.jpg",
    text: "gm",
    isProfileImageNft: false,
    timestamp: "2021-03-21T18:30:00.000Z",
  },
  {
    displayName: "John Doe",
    userName: "johndoe",
    avatar:
      "https://bafybeice3lmabcb7z4kesudbv7mmtnhklvetuz3y5utcwdmuwfpkksngza.ipfs.w3s.link/profile10.jpg",
    text: "gm",
    isProfileImageNft: false,
    timestamp: "2021-03-21T18:30:00.000Z",
  },
  {
    displayName: "John Doe",
    userName: "johndoe",
    avatar:
      "https://bafybeigxwfhwwp6szduoq6qvoqro24524b6m7vqja5gnzh2qsiauh2gpre.ipfs.w3s.link/profile9.png",
    text: "gm",
    isProfileImageNft: false,
    timestamp: "2022-03-21T18:30:00.000Z",
  },
  {
    displayName: "John Doe",
    userName: "johndoe",
    avatar:
      "https://bafybeigxwfhwwp6szduoq6qvoqro24524b6m7vqja5gnzh2qsiauh2gpre.ipfs.w3s.link/profile9.png",
    text: "gm",
    isProfileImageNft: false,
    timestamp: "2022-03-21T18:30:00.000Z",
  },
  {
    displayName: "John Doe",
    userName: "johndoe",
    avatar:
      "https://bafybeigxwfhwwp6szduoq6qvoqro24524b6m7vqja5gnzh2qsiauh2gpre.ipfs.w3s.link/profile9.png",
    text: "gm",
    isProfileImageNft: false,
    timestamp: "2022-03-21T18:30:00.000Z",
  },
  {
    displayName: "John Doe",
    userName: "johndoe",
    avatar:
      "https://bafybeigxwfhwwp6szduoq6qvoqro24524b6m7vqja5gnzh2qsiauh2gpre.ipfs.w3s.link/profile9.png",
    text: "gm",
    isProfileImageNft: false,
    timestamp: "2022-03-21T18:30:00.000Z",
  },
  {
    displayName: "John Doe",
    userName: "johndoe",
    avatar:
      "https://bafybeigxwfhwwp6szduoq6qvoqro24524b6m7vqja5gnzh2qsiauh2gpre.ipfs.w3s.link/profile9.png",
    text: "gm",
    isProfileImageNft: false,
    timestamp: "2022-03-21T18:30:00.000Z",
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
