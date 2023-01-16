import React, { useState } from "react";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { FaRegComment, FaRetweet } from "react-icons/fa";
import { FiShare } from "react-icons/fi";
import { format } from "timeago.js";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { parseTwitterDate } from "../lib/utils";
import { useContext } from "react";
import { TwitterContext } from "../context/TwitterContext";
import { useRef, useEffect } from "react";
import useCounter from "./useCounter";
const style = {
  tweetSuperScript: `pl-4 pt-2 text-[0.8rem] font-bold text-[#8899a6] flex items-center gap-2`,
  postMain: `flex-1 px-4 max-w-[90%]`,
  headerDetails: `flex items-center flex-start `,
  name: `font-bold mr-1 truncate w-[5rem] max-w-fit flex-[1]`,
  verified: `text-[0.8rem] text-twitter dark:text-white`,
  handle: `text-[#8899a6] text-sm ml-1 truncate max-w-[6rem] w-fit `,
  timeAgo: `text-[#8899a6] text-sm ml-1 max-w-fit w-full `,
  wrapper: `flex p-3 border-b border-primaryContrast dark:border-primaryContrastDark max-w-full`,
  profileImage: `rounded-full h-[40px] w-[40px] object-cover`,
  tweet: `my-2`,
  image: `rounded-3xl`,
  footer: `flex justify-between sm:px-8 mt-4 text-[#536371] dark:text-[#8899a6] mx-auto`,
  footerIcon: `rounded-full text-lg p-2 cursor-pointer group-active:animate-ping `,
  avatarContainer: `flex-shrink-0`,
  footerIconContainer: `flex items-center group min-w-[3rem] justify-start`,
  footerText: `text-xs`,
};
const Post = ({
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
  superScript,
  superScriptText,
  superScriptUser,
  referenced_tweet_child,
}) => {
  const { currentUser, actionOnTweet } = useContext(TwitterContext);

  //like counter
  const {
    count: likesCount,
    increment: incrementLikeCount,
    decrement: decrementLikeCount,
    isActive: isLikedState,
    setIsActive: setIsLikedState,
    counterRef: likeRef,
    handleCount: handleLike,
  } = useCounter({
    initialCount: public_metrics.like_count || 0,
    initialRef: null,
    initialActive: isLiked,
  });

  //retweet counter
  const {
    count: retweetCount,
    increment: incrementRetweetCount,
    decrement: decrementRetweetCount,
    isActive: isRetweetedState,
    setIsActive: setIsRetweetedState,
    counterRef: retweetRef,
    handleCount: handleRetweet,
  } = useCounter({
    initialCount: public_metrics.retweet_count || 0 ,
    initialRef: null,
    initialActive: isRetweeted,
  });

  const superScriptIcon = () => {
    // const whoRetweeted = referenced_tweets[-1]?.id?.author?._id === currentUser?._id ? "You" : referenced_tweets[-1]?.id?.author?.name;
    if (!superScript) return;

    if (superScriptText === "Retweeted") {
      return <FaRetweet className="text-[1rem]" />;
    }
    if (superScriptText === "Replied") {
      return <FaRegComment className="text-[1rem]" />;
    }
  };

  return (
    <>
      {superScript && (
        <div className={style.tweetSuperScript}>
          {/* {RefTweetRetweet(referenced_tweets)} */}
          {superScriptIcon()}
          {superScriptUser} {superScriptText}
        </div>
      )}
      <div className={style.wrapper}>
        <div className={style.avatarContainer}>
          {avatar ? (
            <img
              src={avatar}
              alt={displayName}
              className={
                isProfileImageNft
                  ? `${style.profileImage} smallHex`
                  : style.profileImage
              }
            />
          ) : (
            <>
              <div
                className={`${style.profileImage} h-[40px] w-[40px] bg-slate-400`}
              ></div>
            </>
          )}
        </div>
        <div className={style.postMain}>
          <div>
            <span className={style.headerDetails}>
              <span className={style.name}>{displayName}</span>
              {isProfileImageNft && (
                <span className={style.verified}>
                  <BsFillPatchCheckFill />
                </span>
              )}

              <span className={style.handle}>@{userName}</span>
              <span className={style.timeAgo}>
                • {parseTwitterDate(timestamp)}
              </span>
            </span>
            <div className={style.tweet}>{text}</div>
          </div>
          <div className={style.footer}>
            <div className={style.footerIconContainer}>
              <div
                className={`${style.footerIcon} group-hover:bg-[#1d9bf033] group-hover:text-twitter`}
              >
                <FaRegComment />
              </div>
              {
                <span
                  className={` ${style.footerText} group-hover:text-twitter`}
                >
                  {public_metrics?.reply_count > 0
                    ? public_metrics?.reply_count
                    : "  "}
                </span>
              }
            </div>

            <div
              className={style.footerIconContainer}
              onClick={() => handleRetweet("retweet", "unretweet", tweetId, referenced_tweet_child)}
            >
              <div
                className={`${style.footerIcon} group-hover:bg-[#00ba7c33] group-hover:text-[#03ba7c]`}
              >
                {isRetweetedState ? (
                  <FaRetweet color="#03ba7c" />
                ) : (
                  <FaRetweet />
                )}
              </div>

              {retweetCount > 0 && (
                <span
                  ref={retweetRef}
                  className={` ${style.footerText} group-hover:text-[#03ba7c]`}
                >
                  {retweetCount}
                </span>
              )}
            </div>
            <div
              className={style.footerIconContainer}
              onClick={() => handleLike("like", "unlike", tweetId)}
            >
              <div
                className={`${style.footerIcon} group-hover:bg-[#f9188033] group-hover:text-[#f91c80]`}
              >
                {isLikedState ? (
                  <AiFillHeart color="#f91c80" />
                ) : (
                  <AiOutlineHeart />
                )}
              </div>
              {likesCount > 0 && (
                <span
                  ref={likeRef}
                  className={` ${style.footerText} duration-200 ease-in-out active:animate-bounce group-hover:text-[#f91c80]`}
                >
                  {likesCount}
                </span>
              )}
            </div>
            <div className={style.footerIconContainer}>
              <div
                className={`${style.footerIcon} group-hover:bg-[#1d9bf033] group-hover:text-[#1d9bf0]`}
              >
                <FiShare />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
