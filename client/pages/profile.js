import React from "react";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileTweets from "../components/profile/ProfileTweets";

const style = {
  //   wrapper: `flex justify-center h-screen w-screen select-none bg-primaryBgl dark:bg-primaryBgd text-black dark:text-white`,
  //   content: `max-w-[1400px] w-2/3 flex justify-between`,
  // wrapper: `bg-primaryBgl dark:bg-primaryBgd min-h-screen flex max-w-[1440px] mx-auto text-black dark:text-white`,
  wrapper: `bg-primaryBgl dark:bg-primaryBgd min-h-screen flex lg:w-[95%] max-w-[1440px] mx-auto text-black dark:text-white`,
  content: `max-w-[1400px] flex justify-between `,
  // mainContent: `z-45 flex-[1.8] border-r border-l border-primaryContrast dark:border-primaryContrastDark max-w-2xl  sm:ml-[80px] xl:ml-[370px]`,
  mainContent: `z-45  flex-[1.7] border-r border-l border-primaryContrast dark:border-primaryContrastDark max-w-2xl  sm:ml-[80px] lg:ml-[24%]`,
};

const profile = () => {
  return (
    <div className={style.wrapper}>
      {/* <div className={style.content}> */}
      <Sidebar />
      <div className={style.mainContent}>
        <ProfileHeader />
        <ProfileTweets />
      </div>
      <Widgets />
      {/* </div> */}
    </div>
  );
};

export default profile;
