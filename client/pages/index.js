import Sidebar from "../components/Sidebar";
import Feed from "../components/home/Feed";
import Widgets from "../components/Widgets";
import { useContext } from "react";
import { TwitterContext } from "../context/TwitterContext";
import Image from "next/image";
import metamaskLogo from "../assets/metamask.png";
import errorLogo from "../assets/error.png";
import Head from "next/head";
import { useTheme } from "next-themes";
import { useEffect } from "react";
const style = {
  // wrapper: `flex justify-center h-full 2xl:h-screen p-0  select-none bg-primaryBgl dark:bg-primaryBgd text-black dark:text-white  `,
  wrapper: `bg-primaryBgl dark:bg-primaryBgd min-h-screen flex lg:w-[95%] max-w-[1440px] mx-auto text-black dark:text-white`,
  content: `max-w-[1400px] w-9/10 2xl:w-2/3 flex justify-between `,
  loginContainer: `w-full flex flex-col justify-center items-center pb-48`,
  walletConnectButton: `text-2xl dark:text-black text-white dark:bg-white bg-black font-bold mb-[-3rem] mt-[3rem] px-6 py-4 rounded-full cursor-pointer dark:hover:bg-[#d7dbdc] hover:bg-[#2c2c2c]`,
  loginContent: `text-3xl font-bold text-center mt-24`,
};

export default function Home() {
  const { appStatus, connectToWallet } = useContext(TwitterContext);
  const { systemTheme, setTheme } = useTheme();

  useEffect(() => {
    if (systemTheme === "dark") setTheme("dark");
    else setTheme("light");
  }, [systemTheme]);

  const app = (status = appStatus) => {
    switch (status) {
      case "connected":
        return userLoggedIn;

      case "notConnected":
        return noUserFound;

      case "noMetamask":
        return noMetamaskFound;

      case "error":
        return errorFound;

      default:
        return loading;
    }
  };

  const userLoggedIn = (
    <>
      <Sidebar />
      <Feed />
      <Widgets />
    </>
  );

  const noUserFound = (
    <div className={style.loginContainer}>
      <Image src={metamaskLogo} width={200} height={200} />
      <div
        className={style.walletConnectButton}
        onClick={() => connectToWallet()}
      >
        Connect Wallet
      </div>
      <div className={style.loginContent}>Connect to wallet </div>
    </div>
  );
  const noMetamaskFound = (
    <div className={style.loginContainer}>
      <Image src={metamaskLogo} height={200} width={200} />
      <div className={style.loginContent}>
        <a
          target="_blank"
          rel="noreferrer"
          href={"https://metamask.io/download.html"}
        >
          You Must Install Metamask
        </a>
      </div>
    </div>
  );

  const errorFound = (
    <div className={style.loginContainer}>
      <Image src={errorLogo} height={200} width={200} />
      <div className={style.loginContent}>
        <div>Something went wrong</div>
        <div>Try refreshing the page or use another browser</div>
      </div>
    </div>
  );

  const loading = (
    <div className={style.loginContainer}>
      <div className={style.loginContent}>
        <div>Loading...</div>
      </div>
    </div>
  );

  return (
    <div>
      <Head>
        <title>Buzz</title>
      </Head>
      <div className={style.wrapper}>
        {/* <div className={style.content}> */}
        {app(appStatus)}
        {/* </div> */}
      </div>
    </div>
  );
}
