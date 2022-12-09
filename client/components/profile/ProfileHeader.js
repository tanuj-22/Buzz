import { useContext, useEffect, useState } from "react";
import { TwitterContext } from "../../context/TwitterContext";
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
  nftImageContainer: `object-cover h-full w-12 h-12 bg-primaryBgl dark:bg-primaryBgd`,
  profileImageNft: `object-cover h-[8rem] w-[8rem] h-full outline outline-offset-0 outline-[5px] outline-primaryBgl dark:outline-primaryBgd`,
  profileImageMint: `bg-white text-black px-3 py-1 rounded-full hover:bg-[#8899a6] cursor-pointer`,
  details: `px-3`,
  nav: `flex justify-around mt-4 mb-2 text-xs font-semibold text-[#8899a6]`,
  activeNav: `text-black dark:text-white`,
};

const ProfileHeader = () => {
  const { currentAccount, currentUser } = useContext(TwitterContext);
  const router = useRouter();
  const [userData, setUserData] = useState({
    name: "",
    profileImage: "",
    coverImage: "",
    walletAddress: "",
    tweets: [],
    isProfileImageNft: false,
  });
  useEffect(() => {
    if (!currentUser) return;

    setUserData({
      name: currentUser.name,
      profileImage: currentUser.profileImage,
      walletAddress: currentUser.walletAddress,
      coverImage: currentUser.coverImage,
      tweets: currentUser.tweets,
      isProfileImageNft: currentUser.isProfileImageNft,
    });
  }, [currentUser]);

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <div onClick={() => router.push("/")} className={style.backButton}>
          <BsArrowLeftShort />
        </div>
        <div className={style.details}>
          <div className={style.primary}>{userData.name}</div>
          <div className={style.secondary}>
            {userData.tweets && userData.tweets.length} Tweets
          </div>
        </div>
      </div>
      <div className={style.coverPhotoContainer}>
        {userData.coverImage ? (
          <img
            src={userData.coverImage}
            alt="cover"
            className={style.coverPhoto}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "https://via.placeholder.com/300X100";
            }}
          />
        ) : (
          <div className={`${style.coverPhoto} h-[200px] bg-slate-500`}></div>
        )}
      </div>
      <div>
        {userData.profileImage ? (
          <div className={style.profileImageContainer}>
            {userData.isProfileImageNft ? (
              <>
                <img
                  src={userData.profileImage}
                  alt="profile"
                  className={`${style.profileImageNft} hex`}
                />
              </>
            ) : (
              <img
                src={userData.profileImage}
                alt="profile"
                className={style.profileImage}
              />
            )}
          </div>
        ) : (
          <>
            <div className={style.profileImageContainer}>
              <div
                className={`${style.profileImage}  h-[128px] w-[128px] bg-slate-500`}
              ></div>
            </div>
          </>
        )}
      </div>
      <div className={style.details}>
        <div>
          <div className={style.primary}>{userData.name}</div>
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
