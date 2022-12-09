import React from "react";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { FaRegComment, FaRetweet } from "react-icons/fa";
import { FiShare } from "react-icons/fi";
import { format } from "timeago.js";
import { AiOutlineHeart } from "react-icons/ai";
import {parseTwitterDate} from "../lib/utils";
const style = {
  wrapper: `flex p-3 border-b border-primaryContrast dark:border-primaryContrastDark `,
  profileImage: `rounded-full h-[40px] w-[40px] object-cover`,
  postMain: `flex-1 px-4`,
  headerDetails: `flex items-center`,
  name: `font-bold mr-1`,
  verified: `text-[0.8rem]`,
  handleAndTimeAgo: `text-[#8899a6] ml-1`,
  tweet: `my-2`,
  image: `rounded-3xl`,
  footer: `flex justify-between sm:px-8 mt-4 text-[#8899a6] mx-auto`,
  footerIcon: `rounded-full text-lg p-2 cursor-pointer`,
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
      <div>
        {avatar ? (
          <img
            src={avatar}
            alt={userName}
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

            <span className={style.handleAndTimeAgo}>
              @{userName} • {parseTwitterDate(timestamp)}
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
