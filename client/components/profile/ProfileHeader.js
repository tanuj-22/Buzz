import { useContext } from "react";
import { TwitterContext } from "../../context/TwitterContext";
import { BsArrowLeftShort } from "react-icons/bs";
import { useRouter } from "next/router";

import { MdOutlineLocationOn } from "react-icons/md";
const style = {
  wrapper: `border-primaryContrast dark:border-primaryContrastDark border-b`,
  header: `py-1 px-3 flex items-center sticky top-0 z-50 w-full bg-white/[0.8] dark:bg-black/[0.8] backdrop-blur-sm`,
  Detailsprimary: `bg-transparent outline-none font-bold text-lg`,
  Detailssecondary: `text-twitterContrastDark text-[0.75rem]`,
  primary: `bg-transparent outline-none font-bold text-3xl`,
  secondary: `text-twitterContrastDark text-[0.95rem]`,
  backButton: `text-3xl cursor-pointer mr-2 rounded-full hover:bg-primaryHover dark:hover:bg-primaryHoverDark p-1 z-50`,
  coverPhotoContainer: ` z-[-1] flex items-center justify-center aspect-[3/1] overflow-hidden`,
  coverPhoto: `z-0 object-cover h-full w-full`,
  profileImageContainer: `relative z-100 aspect-square w-full h-[8rem] rounded-full mt-[-4rem] mb-2 flex justify-start items-center px-3 flex justify-between`,
  profileImage: `z-100 aspect-square object-cover rounded-full outline outline-offset-0 outline-[5px] outline-primaryBgl dark:outline-primaryBgd  h-full`,
  nftImageContainer: `rounded-full`,
  profileImageNft: ` object-cover h-[8rem] w-[8rem] h-full outline outline-offset-0 outline-[5px] outline-primaryBgl dark:outline-primaryBgd`,
  profileImageMint: `relative top-[1.8rem] font-bold text-[0.9rem] bg-primaryBgl dark:bg-primaryBgd text-black dark:text-white px-4 py-2 rounded-full hover:bg-primaryHover dark:hover:bg-primaryHoverDark cursor-pointer outline outline-offset-0 outline-[1px] outline-primaryContrast dark:outline-primaryContrastDark`,
  details: `px-3`,
  nav: `flex justify-around mt-4 mb-2 text-[0.9rem] tracking-tight pb-2 font-semibold text-twitterContrastDark`,
  activeNav: `text-black dark:text-white underline underline-offset-[1.2rem] decoration-twitter decoration-[0.2rem]`,
  bio: `text-[1rem] bg-primaryBgl dark:bg-primaryBgd mt-2 `,
  location: `text-[0.975rem] flex items-center text-twitterContrastDark max-w-fit gap-1`,
  locationIcon: `text-md `,
};

const ProfileHeader = () => {
  const {
    currentAccount,
    currentUser: userData,
    setCurrentUser,
  } = useContext(TwitterContext);
  const router = useRouter();
  // const [userData, setUserData] = useState({
  //   name: "",
  //   profileImage: "",
  //   coverImage: "",
  //   walletAddress: "",
  //   tweets: [],
  //   isProfileImageNft: false,
  // });
  // useEffect(() => {
  //   if (!currentUser) return;

  //   setUserData({
  //     name: currentUser.name,
  //     profileImage: currentUser.profileImage,
  //     walletAddress: currentUser.walletAddress,
  //     coverImage: currentUser.coverImage,
  //     tweets: currentUser.tweets,
  //     isProfileImageNft: currentUser.isProfileImageNft,
  //   });
  // }, [currentUser]);

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <div onClick={() => router.back()} className={style.backButton}>
          <BsArrowLeftShort />
        </div>
        <div className={style.details}>
          <div className={style.Detailsprimary}>{userData.name}</div>
          <div className={style.Detailssecondary}>
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
          <div
            className={`${style.coverPhoto} h-[200px] animate-loading bg-slate-500`}
          ></div>
        )}
      </div>
      <div>
        {userData.profileImage ? (
          <div className={style.profileImageContainer}>
            {userData.isProfileImageNft ? (
              <>
                <div className={`${style.nftImageContainer} hex`}>
                  <img
                    src={userData.profileImage}
                    alt="profile"
                    className={`${style.profileImageNft}`}
                  />
                </div>
              </>
            ) : (
              <img
                src={userData.profileImage}
                alt="profile"
                className={style.profileImage}
              />
            )}
            <div className={style.editButton}>
              <div
                className={style.profileImageMint}
                onClick={() =>
                  router.push(`${router.pathname}/?editProfile=${userData._id}`)
                }
              >
                Edit profile
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className={style.profileImageContainer}>
              <div
                className={`${style.profileImage} h-[128px] w-[128px] animate-loading bg-slate-500`}
              ></div>
              <div className={style.editButton}>
                <div
                  className={style.profileImageMint}
                  onClick={() =>
                    router.push(
                      `${router.pathname}/?editProfile=${userData._id}`
                    )
                  }
                >
                  Edit profile
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className={style.details}>
        <div>
          <div className={style.primary}>{userData.name}</div>
        </div>
        <div className={style.secondary}>
          {userData && userData.username}
        </div>
        <div className={style.bio}>{userData.bio}</div>
        <div className={style.location}>
          <MdOutlineLocationOn className={style.locationIcon} />

          <span className={style.location}>{userData.location}</span>
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
