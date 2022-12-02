import { useState } from "react";
import { VscTwitter } from "react-icons/vsc";
import SidebarOption from "./SidebarOption";
import { RiHome7Line, RiHome7Fill, RiFileList2Fill } from "react-icons/ri";
import { BiHash } from "react-icons/bi";
import { FiBell, FiMoreHorizontal } from "react-icons/fi";
import { HiOutlineMail, HiMail } from "react-icons/hi";
import { FaRegListAlt, FaHashtag, FaBell } from "react-icons/fa";
import { CgMoreO } from "react-icons/cg";
import {
  BsBookmark,
  BsBookmarkFill,
  BsPerson,
  BsPersonFill,
} from "react-icons/bs";

const style = {
  // wrapper: `hidden sm:flex flex-[0.7] px-8 flex-col h-full fixed`,
  wrapper: `fixed z-40 sm:flex sm:flex-[0.7] sm:flex-col sm:h-full items-center xl:items-start xl:w-[340px] sm:p-2 xl:ml-24`,
  twitterIconContainer: `hidden sm:inline text-3xl m-4 items-start`,
  tweetButton: `hidden xl:flex bg-[#1d9bf0] hover:bg-[#1b8cd8] items-center justify-center font-bold rounded-3xl h-[50px] mt-[20px] cursor-pointer`,
  navContainer: `hidden sm:inline sm:flex-1`,
  mobNavContainer: `fixed bottom-0 flex flex-grow bg-[#15202b] border-t border-[#38444d] w-full flex-row sm:hidden`,
  profileButton: `sticky sm:border-0 pb-3 p-4 items-start sm:static sm:flex sm:items-center sm:mb-6 cursor-pointer hover:bg-[#333c45] sm:rounded-[100px] sm:p-2 `,
  profileLeft: `  sm:flex sm:item-center sm:justify-center xl:mr-4`,
  profileImage: `z-40 height-8 w-8 sm:static sm:height-12 sm:w-12 rounded-full object-contain`,
  profileRight: `flex-1 hidden xl:flex`,
  details: `flex-1 `,
  name: `text-lg`,
  handle: `text-[#8899a6]`,
  moreContainer: `flex items-center  mr-2 ml-24`,
};

function Sidebar({ initialSelectedIcon = "Home" }) {
  const [selected, setSelected] = useState(initialSelectedIcon);
  return (
    <div className={style.wrapper}>
      <div className={style.twitterIconContainer}>
        <VscTwitter />
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

        <div className={style.tweetButton}>Tweet</div>
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
      </div>
      <div className={style.profileButton}>
        <div className={style.profileLeft}>
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw3NjA4Mjc3NHx8ZW58MHx8fHw%3D&w=1000&q=80"
            alt="profile"
            className={style.profileImage}
          />
        </div>
        <div className={style.profileRight}>
          <div className={style.details}>
            <div className={style.name}>Name</div>
            <div className={style.handle}>@handle</div>
          </div>
          <div className={style.moreContainer}>
            <FiMoreHorizontal />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
