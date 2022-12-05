import Sidebar from "../components/Sidebar";
import Feed from "../components/home/Feed";
import Widgets from "../components/Widgets";
const style = {
  // wrapper: `flex justify-center h-full 2xl:h-screen p-0  select-none bg-primaryBgl dark:bg-primaryBgd text-black dark:text-white  `,
  wrapper: `bg-primaryBgl dark:bg-primaryBgd min-h-screen flex lg:w-[95%] max-w-[1440px] mx-auto text-black dark:text-white`,
  content: `max-w-[1400px] w-9/10 2xl:w-2/3 flex justify-between `,
};

export default function Home() {
  return (
    <div className={style.wrapper}>
      {/* <div className={style.content}> */}
      <Sidebar />
      <Feed />
      <Widgets />
      {/* </div> */}
    </div>
  );
}
