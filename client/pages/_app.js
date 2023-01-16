import "../styles/globals.css";
import "../lib/hexStyles.css";
import { TwitterProvider } from "../context/TwitterContext";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <TwitterProvider>
        <div className="bg-primaryBgl dark:bg-primaryBgd">
          <Component {...pageProps} />
        </div>
      </TwitterProvider>
    </ThemeProvider>
  );
}

export default MyApp;
