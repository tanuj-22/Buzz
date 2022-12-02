import Sidebar from "../components/Sidebar";
import Feed from "../components/home/Feed";
import Widgets from "../components/Widgets";
const style = {
  // wrapper: `flex justify-center h-full 2xl:h-screen p-0  select-none bg-[#15202b] text-white  `,
  wrapper : `bg-[#15202b] min-h-screen flex max-w-[1500px] mx-auto text-white`,
  content: `max-w-[1400px] w-9/10 2xl:w-2/3 flex justify-between `
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
