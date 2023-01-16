import React from "react";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
import BookmarksHeader from "../components/bookmarks/BookmarksHeader";

const style = {
  wrapper: `bg-primaryBgl dark:bg-primaryBgd min-h-screen flex lg:w-[95%] max-w-[1440px] mx-auto text-black dark:text-white`,
  content: `max-w-[1400px] flex justify-between `,
  mainContent: `z-45  flex-[1.7] border-r border-l border-primaryContrast dark:border-primaryContrastDark max-w-2xl  sm:ml-[80px] lg:ml-[24%]`,
};

const bookmarks = () => {
  return (
    <div className={style.wrapper}>
      <Sidebar initialSelectedIcon={"Bookmarks"} />
      <div className={style.mainContent}>
        <BookmarksHeader />
      </div>
      <Widgets />
    </div>
  );
};

export default bookmarks;
