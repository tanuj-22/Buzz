import React, { useEffect, useRef, useState } from "react";
import { BsCardImage, BsEmojiSmile } from "react-icons/bs";
import { RiFileGifLine, RiBarChartHorizontalFill } from "react-icons/ri";
import { IoMdCalendar } from "react-icons/io";
import { MdOutlineLocationOn } from "react-icons/md";
import { client } from "../../lib/client";
import { useContext } from "react";
import { TwitterContext } from "../../context/TwitterContext";
import { useRouter } from "next/router";
const style = {
  wrapper: `mt-2 px-4 sm:flex flex-row border-b border-primaryContrast dark:border-primaryContrastDark pb-4`,
  tweetBoxLeft: `mr-4`,
  tweetBoxRight: `flex-1 `,
  profileImage: `h-12 w-12 rounded-full object-cover`,
  inputField: `sm:mt-2 sm:pt-1 w-full h-auto outline-none bg-transparent text-xl resize-none placeholder:text-[#0f141999] dark:placeholder:text-[#8899a6]`,
  formLowerContainer: `flex mt-2`,
  iconsContainer: `text-twitter flex flex-1 items-center`,
  icon: `ml-2 mr-2 text-xl `,
  iconInactive: `ml-2 mr-2 text-xl text-twitter/50`,
  submitGeneral: `px-6 py-2 rounded-3xl font-bold`,
  inactiveSubmit: `bg-twitterLight text-white dark:bg-twitterDark dark:text-[#95999e]`,
  activeSubmit: `bg-twitter text-white dark:text-black`,
};

const TweetBox = () => {
  const [tweetMessage, setTweetMessage] = useState("");
  const router = useRouter();
  const { currentAccount, currentUser, fetchTweets, doTweet } =
    useContext(TwitterContext);
  const textareaRef = useRef(null);
  const postTweet = async (e) => {
    e.preventDefault();
    if (!tweetMessage) return;
    const tweetId = `${currentUser._id}_${Date.now()}`;
    const tweetDoc = {
      _id: tweetId,
      _type: "tweets",
      tweet: tweetMessage,
      timestamp: new Date(Date.now()).toISOString(),
      author: {
        _type: "reference",
        _ref: currentAccount,
        _key: tweetId,
      },
    };
    setTweetMessage("");
    await doTweet(tweetDoc);
    // router.push("/");

    // await client.createIfNotExists(tweetDoc);

    // await client
    //   .patch(currentAccount)
    //   .setIfMissing({ tweets: [] })
    //   .insert("after", "tweets[-1]", [
    //     {
    //       _key: tweetId,
    //       _ref: tweetId,
    //       _type: "reference",
    //     },
    //   ])
    //   .commit();

    // await fetchTweets();
  };
  useEffect(() => {
    textareaRef.current.style.height = "0px";
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + "px";
  }, [tweetMessage]);
  return (
    <div className={style.wrapper}>
      <div className={style.tweetBoxLeft}>
        {currentUser.profileImage ? (
          <img
            src={currentUser.profileImage}
            alt="profile image"
            className={
              currentUser.isProfileImageNft
                ? `${style.profileImage} hex`
                : style.profileImage
            }
          />
        ) : (
          <>
            <div
              className={`${style.profileImage} h-12 w-12 bg-slate-400`}
            ></div>
          </>
        )}
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
              <RiFileGifLine className={style.iconInactive} />
              <RiBarChartHorizontalFill className={style.iconInactive} />
              <BsEmojiSmile className={style.iconInactive} />
              <IoMdCalendar className={style.iconInactive} />
              <MdOutlineLocationOn className={style.iconInactive} />
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
