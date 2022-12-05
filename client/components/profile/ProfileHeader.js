import { useContext, useEffect, useState } from "react";

import { BsArrowLeftShort } from "react-icons/bs";
import { useRouter } from "next/router";

const style = {
  wrapper: `border-primaryContrast dark:border-primaryContrastDark border-b`,
  header: `py-1 px-3 mt-2 flex items-center`,
  primary: `bg-transparent outline-none font-bold`,
  secondary: `text-[#8899a6] text-xs`,
  backButton: `text-3xl cursor-pointer mr-2 rounded-full hover:bg-primaryHover dark:hover:bg-primaryHoverDark p-1 z-50`,
  //   coverPhotoContainer: `flex items-center justify-center h-[15vh] overflow-hidden`,
  coverPhoto: `object-cover h-full w-full`,
  profileImageContainer: `w-full h-[8rem] rounded-full mt-[-4rem] mb-2 flex justify-start items-center px-3 flex justify-between`,
  profileImage: `object-cover rounded-full outline outline-offset-0 outline-[5px] outline-primaryBgl dark:outline-primaryBgd  h-full`,
  profileImageNft: `object-cover h-full`,
  profileImageMint: `bg-white text-black px-3 py-1 rounded-full hover:bg-[#8899a6] cursor-pointer`,
  details: `px-3`,
  nav: `flex justify-around mt-4 mb-2 text-xs font-semibold text-[#8899a6]`,
  activeNav: `text-black dark:text-white`,
};

const ProfileHeader = () => {
  const router = useRouter();
  const isProfileImageNft = false;
  const currentAccount = "0x123adfe32af32423421adffee";
  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <div onClick={() => router.push("/")} className={style.backButton}>
          <BsArrowLeftShort />
        </div>
        <div className={style.details}>
          <div className={style.primary}>Tanuj Pancholi</div>
          <div className={style.secondary}>3 tweets</div>
        </div>
      </div>
      <div className={style.coverPhotoContainer}>
        <img
          src="https://pbs.twimg.com/profile_banners/185142711/1658960675/1500x500"
          alt="cover"
          className={style.coverPhoto}
        />
      </div>
      <div>
        <div
          className={isProfileImageNft ? "hex" : style.profileImageContainer}
        >
          <img
            src="https://bafybeice3lmabcb7z4kesudbv7mmtnhklvetuz3y5utcwdmuwfpkksngza.ipfs.w3s.link/profile10.jpg"
            alt="profile"
            className={
              isProfileImageNft ? style.profileImageNft : style.profileImage
            }
          />
        </div>
      </div>
      <div className={style.details}>
        <div>
          <div className={style.primary}>Tanuj Pancholi</div>
        </div>
        <div className={style.secondary}>
          {currentAccount && (
            <>
              @{currentAccount.slice(0, 8)}...{currentAccount.slice(-4)}
            </>
          )}
        </div>
      </div>
      <div className={style.nav}>
        <div className={style.activeNav}>Tweets</div>
        <div>Tweets & replies</div>
        <div>Media</div>
        <div>Likes</div>
      </div>
    </div>
  );
};

export default ProfileHeader;
