import { useState } from "react";
import { VscTwitter } from "react-icons/vsc";
import {GiHummingbird} from "react-icons/gi";
import SidebarOption from "./SidebarOption";
import { RiHome7Line, RiHome7Fill, RiFileList2Fill } from "react-icons/ri";
import Link from "next/link";
import { BiHash } from "react-icons/bi";
import { FiBell, FiMoreHorizontal } from "react-icons/fi";
import { HiOutlineMail, HiMail } from "react-icons/hi";
import { FaRegListAlt, FaHashtag, FaBell } from "react-icons/fa";
import { CgMoreO } from "react-icons/cg";
import { useContext } from "react";
import { TwitterContext } from "../context/TwitterContext";
import Modal from "react-modal";
import ProfileImageMinter from "./mintingModal/ProfileImageMinter";
import {
  BsBookmark,
  BsBookmarkFill,
  BsPerson,
  BsPersonFill,
} from "react-icons/bs";
import { useRouter } from "next/router";
import { customStyles } from "../lib/constants";

const style = {
  // wrapper: `hidden sm:flex flex-[0.7] px-8 flex-col h-full fixed`,
  wrapper: `fixed z-40 sm:flex sm:flex-[0.7] sm:flex-col sm:h-full items-center xl:items-start lg:w-[15%] sm:p-2 lg:ml-12`,
  twitterIconContainer: `text-twitter dark:text-white hidden sm:inline text-3xl m-4 items-start`,
  tweetButton: `text-white  flex flex-col bg-twitter hover:bg-twitterDark items-center justify-center font-bold rounded-3xl h-[50px] mt-[20px] cursor-pointer`,
  tweetButtonMobile: `text-white w-20 bg-twitter flex flex-col justify-center text-center align-center hover:bg-twitterDark font-bold rounded-2xl h-[40px] mr-4 mt-2 cursor-pointer`,
  navContainer: `hidden sm:inline sm:flex-1 w-full`,
  mobNavContainer: `z-60 fixed bottom-0 flex flex-grow bg-primaryBgl dark:bg-primaryBgd border-t border-primaryContrast dark:border-primaryContrastDark w-full flex-row sm:hidden`,
  profileButton: `sticky sm:border-0 pb-3 p-4 items-start sm:static sm:flex sm:items-center sm:mb-6 cursor-pointer hover:bg-primaryHover dark:hover:bg-primaryHoverDark sm:rounded-[100px] sm:p-2 lg:w-max`,
  profileLeft: `  sm:flex sm:item-center sm:justify-center lg:mr-4`,
  profileImage: `z-40 h-8 w-8 sm:static sm:h-12 sm:w-12 rounded-full object-cover`,
  profileImageProfile: `hidden sm:block z-40 h-8 w-8 sm:static sm:h-12 sm:w-12 rounded-full object-cover`,
  profileRight: `flex-1 hidden lg:flex`,
  details: `flex-1 `,
  name: `text-lg truncate max-w-fit w-[6rem] font-bold`,
  handle: `text-[#536371] dark:text-[#8899a6] max-w-fit w-[6rem] truncate`,
  moreContainer: `flex items-center  mr-2 ml-24 md:ml-12 `,
};

function Sidebar({ initialSelectedIcon = "Home" }) {
  const [selected, setSelected] = useState(initialSelectedIcon);
  const router = useRouter();
  const { currentUser, currentAccount } = useContext(TwitterContext);
  return (
    <div className={style.wrapper}>
      <div className={style.twitterIconContainer}>
        <GiHummingbird size={"3rem"} />
      </div>
      <div className={style.navContainer}>
        <SidebarOption
          Icon={selected === "Home" ? RiHome7Fill : RiHome7Line}
          text="Home"
          isActive={selected === "Home"}
          setSelected={setSelected}
          redirect="/"
        >
          Home
        </SidebarOption>
        <SidebarOption
          Icon={selected === "Explore" ? FaHashtag : BiHash}
          text="Explore"
          isActive={Boolean(selected === "Explore")}
          setSelected={setSelected}
        />
        <SidebarOption
          Icon={selected === "Notifications" ? FaBell : FiBell}
          text="Notifications"
          isActive={Boolean(selected === "Notifications")}
          setSelected={setSelected}
        />
        <SidebarOption
          Icon={selected === "Messages" ? HiMail : HiOutlineMail}
          text="Messages"
          isActive={Boolean(selected === "Messages")}
          setSelected={setSelected}
        />
        <SidebarOption
          Icon={selected === "Bookmarks" ? BsBookmarkFill : BsBookmark}
          text="Bookmarks"
          isActive={Boolean(selected === "Bookmarks")}
          setSelected={setSelected}
        />
        <SidebarOption
          Icon={selected === "Lists" ? RiFileList2Fill : FaRegListAlt}
          text="Lists"
          isActive={Boolean(selected === "Lists")}
          setSelected={setSelected}
        />
        <SidebarOption
          Icon={selected === "Profile" ? BsPersonFill : BsPerson}
          text="Profile"
          isActive={Boolean(selected === "Profile")}
          setSelected={setSelected}
          redirect={"/profile"}
        />
        <SidebarOption Icon={CgMoreO} text="More" setSelected={setSelected} />

        <div
          onClick={() =>
            router.push(`${router.pathname}/?mint=${currentAccount}`)
          }
          className={style.tweetButton}
        >
          Mint
        </div>
      </div>
      <div className={style.mobNavContainer}>
        <SidebarOption
          Icon={selected === "Home" ? RiHome7Fill : RiHome7Line}
          text="Home"
          isActive={selected === "Home"}
          setSelected={setSelected}
          redirect="/"
        >
          Home
        </SidebarOption>
        <SidebarOption
          Icon={selected === "Explore" ? FaHashtag : BiHash}
          text="Explore"
          isActive={Boolean(selected === "Explore")}
          setSelected={setSelected}
        />
        <SidebarOption
          Icon={selected === "Notifications" ? FaBell : FiBell}
          text="Notifications"
          isActive={Boolean(selected === "Notifications")}
          setSelected={setSelected}
        />
        <SidebarOption
          Icon={selected === "Messages" ? HiMail : HiOutlineMail}
          text="Messages"
          isActive={Boolean(selected === "Messages")}
          setSelected={setSelected}
        />
        <div
          onClick={() =>
            router.push(`${router.pathname}/?mint=${currentAccount}`)
          }
          className={style.tweetButtonMobile}
        >
          Mint
        </div>
      </div>
      <div
        className={style.profileButton}
        onClick={() => router.push("/profile")}
      >
        <div className={style.profileLeft}>
          {currentUser.profileImage ? (
            <img
              // https://bafybeigxwfhwwp6szduoq6qvoqro24524b6m7vqja5gnzh2qsiauh2gpre.ipfs.w3s.link/profile9.png
              src={currentUser.profileImage}
              alt="profile"
              className={
                currentUser.isProfileImageNft
                  ? `${
                      router.pathname === "/profile"
                        ? style.profileImageProfile
                        : style.profileImage
                    }  hex`
                  : router.pathname === "/profile"
                  ? style.profileImageProfile
                  : style.profileImage
              }
            />
          ) : (
            <>
              <div
                className={`${style.profileImage} h-8 w-8 bg-slate-400 sm:static sm:h-12  sm:w-12`}
              ></div>
            </>
          )}
        </div>
        <div className={style.profileRight}>
          <div className={style.details}>
            <div className={style.name}>{currentUser.name}</div>
            <div className={style.handle}>
              @{currentAccount}
            </div>
          </div>
          <div className={style.moreContainer}>
            <FiMoreHorizontal />
          </div>
        </div>
      </div>
      <Modal
        isOpen={Boolean(router.query.mint)}
        onRequestClose={() => router.back()}
        style={customStyles}
      >
        <ProfileImageMinter />
      </Modal>
    </div>
  );
}

export default Sidebar;
