import React from "react";
import Post from "../Post";
const style = {
  wrapper: `no-scrollbar`,
  header: `sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center`,
  headerTitle: `text-xl font-bold`,
};

const tweets = [
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
    timestamp: "2021-03-21T18:30:00.000Z",
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
      "https://bafybeigxwfhwwp6szduoq6qvoqro24524b6m7vqja5gnzh2qsiauh2gpre.ipfs.w3s.link/profile9.png",
    text: "gm",
    isProfileImageNft: false,
    timestamp: "2021-03-21T18:30:00.000Z",
  },
];
const ProfileTweets = () => {
  return (
    <div className={style.wrapper}>
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
};

export default ProfileTweets;
