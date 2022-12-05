import React, { useEffect, useRef, useState } from "react";
import { BsCardImage, BsEmojiSmile } from "react-icons/bs";
import { RiFileGifLine, RiBarChartHorizontalFill } from "react-icons/ri";
import { IoMdCalendar } from "react-icons/io";
import { MdOutlineLocationOn } from "react-icons/md";
const style = {
  wrapper: `hidden px-4 sm:flex flex-row border-b border-primaryContrast dark:border-primaryContrastDark pb-4`,
  tweetBoxLeft: `mr-4`,
  tweetBoxRight: `flex-1 `,
  profileImage: `height-12 w-12 rounded-full`,
  inputField: `sm:mt-2 sm:pt-1 w-full h-auto outline-none bg-transparent text-xl resize-none placeholder:text-[#0f141999] dark:placeholder:text-[#8899a6]`,
  formLowerContainer: `flex mt-2`,
  iconsContainer: `text-[#1d9bf0] flex flex-1 items-center`,
  icon: `ml-2 mr-2 text-xl`,
  submitGeneral: `px-6 py-2 rounded-3xl font-bold`,
  inactiveSubmit: `bg-[#9acdf8] text-white dark:bg-[#196195] dark:text-[#95999e]`,
  activeSubmit: `bg-[#1d9bf0] text-white dark:text-black`,
};

const TweetBox = () => {
  const [tweetMessage, setTweetMessage] = useState("");
  const textareaRef = useRef(null);
  const postTweet = (e) => {
    e.preventDefault();
    console.log(tweetMessage);
  };
  useEffect(() => {
    textareaRef.current.style.height = "0px";
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + "px";
}, [tweetMessage]);
  return (
    <div className={style.wrapper}>
      <div className={style.tweetBoxLeft}>
        <img
          src="https://bafybeigxwfhwwp6szduoq6qvoqro24524b6m7vqja5gnzh2qsiauh2gpre.ipfs.w3s.link/profile9.png"
          alt="profile image"
          className={style.profileImage}
        />
      </div>
      <div className={style.tweetBoxRight}>
        <form>
          <textarea
            ref={textareaRef}
            className={style.inputField}
            placeholder="What's happening?"
            value={tweetMessage}
            maxLength="280"
            onChange={(e) => setTweetMessage(e.target.value)}
          />
          <div className={style.formLowerContainer}>
            <div className={style.iconsContainer}>
              <BsCardImage className={style.icon} />
              <RiFileGifLine className={style.icon} />
              <RiBarChartHorizontalFill className={style.icon} />
              <BsEmojiSmile className={style.icon} />
              <IoMdCalendar className={style.icon} />
              <MdOutlineLocationOn className={style.icon} />
            </div>
            <button
              type="submit"
              disabled={!tweetMessage}
              onClick={(e) => postTweet(e)}
              className={`${style.submitGeneral} ${
                tweetMessage ? style.activeSubmit : style.inactiveSubmit
              }`}
            >
              Tweet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TweetBox;
