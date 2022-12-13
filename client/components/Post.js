import React from "react";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { FaRegComment, FaRetweet } from "react-icons/fa";
import { FiShare } from "react-icons/fi";
import { format } from "timeago.js";
import { AiOutlineHeart } from "react-icons/ai";
import { parseTwitterDate } from "../lib/utils";
const style = {
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
  footerIcon: `rounded-full text-lg p-2 cursor-pointer`,
  avatarContainer: `flex-shrink-0`,
};
const Post = ({
  displayName,
  userName,
  avatar,
  text,
  isProfileImageNft,
  timestamp,
}) => {
  return (
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
        <div >
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
          <div
            className={`${style.footerIcon} hover:bg-[#1d9bf033] hover:text-[#1d9bf0]`}
          >
            <FaRegComment />
          </div>
          <div
            className={`${style.footerIcon} hover:bg-[#00ba7c33] hover:text-[#03ba7c]`}
          >
            <FaRetweet />
          </div>
          <div
            className={`${style.footerIcon} hover:bg-[#f9188033] hover:text-[#f91c80]`}
          >
            <AiOutlineHeart />
          </div>
          <div
            className={`${style.footerIcon} hover:bg-[#1d9bf033] hover:text-[#1d9bf0]`}
          >
            <FiShare />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
