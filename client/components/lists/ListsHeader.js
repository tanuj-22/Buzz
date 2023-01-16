import { useContext } from "react";
import { TwitterContext } from "../../context/TwitterContext";
import { BsArrowLeftShort } from "react-icons/bs";
import { useRouter } from "next/router";
import { SlOptions } from "react-icons/sl";

const style = {
  wrapper: `border-primaryContrast dark:border-primaryContrastDark border-b`,
  header: `py-1 px-3 flex items-center sticky top-0 z-50 w-full bg-white/[0.8] dark:bg-black/[0.8] backdrop-blur-sm`,
  Detailsprimary: `bg-transparent outline-none font-bold text-lg`,
  Detailssecondary: `text-twitterContrastDark text-[0.75rem]`,
  backButton: `text-3xl cursor-pointer mr-2 rounded-full hover:bg-primaryHover dark:hover:bg-primaryHoverDark p-1 z-50`,
  details: `px-3 flex justify-between items-center w-full`,
  optbutton: `text-3xl cursor-pointer rounded-full hover:bg-primaryHover dark:hover:bg-primaryHoverDark p-2 z-50`,
};

const ListsHeader = () => {
  const {
    currentAccount,
    currentUser: userData,
    setCurrentUser,
  } = useContext(TwitterContext);
  const router = useRouter();

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <div onClick={() => router.back()} className={style.backButton}>
          <BsArrowLeftShort />
        </div>
        <div className={style.details}>
          <div>
            <div className={style.Detailsprimary}>Lists</div>
            <div className={style.Detailssecondary}>@{userData.username}</div>
          </div>
          <SlOptions className={style.optbutton} />
        </div>
      </div>
    </div>
  );
};

export default ListsHeader;
