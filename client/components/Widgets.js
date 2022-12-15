import { news, whoToFollow } from "../lib/static";
import { BiSearch } from "react-icons/bi";
import { SlOptions } from "react-icons/sl";
import { useContext } from "react";
import { TwitterContext } from "../context/TwitterContext";

const style = {
  wrapper: `flex-[1] p-4 hidden md:block lg:mr-[3%] lg:ml-[1%]`,
  searchBar: `flex items-center bg-[#EFF3F4] dark:bg-[#243340] p-2 rounded-3xl`,
  searchIcon: `text-[#8899a6] mr-2`,
  inputBox: `bg-transparent outline-none`,
  section: `bg-secondaryBgl dark:bg-secondaryBgd my-6 rounded-xl overflow-hidden `,
  title: `p-4 font-bold text-lg`,
  showMore: `p-4 text-twitter text-sm cursor-pointer hover:bg-secondaryHover dark:hover:bg-secondaryHoverDark`,
  item: `flex items-center p-3 my-2 hover:bg-secondaryHover dark:hover:bg-secondaryHoverDark cursor-pointer`,
  newsItemLeft: `flex-1`,
  newsItemCategory: `text-[#8899a6] text-[0.8rem] `,
  newsItemTitle: `text-[0.95rem] font-bold`,
  newsItemFooter: `text-[0.8rem] text-[#8899a6]`,
  newsItemRight: `w-1/5  ml-auto mr-0 self-start`,
  newsItemIcon: `text-[#8899a6] text-[1.8rem] ml-auto mr-2 mt-1 hover:text-twitter hover:bg-twitter/[0.15] p-2 rounded-full cursor-pointer`,
  newsItemImage: `rounded-xl h-14 w-14 object-cover `,
  followAvatarContainer: `w-1/6`,
  followAvatar: `rounded-full h-[40px] w-[40px]`,
  profileDetails: `flex-1`,
  name: `font-bold`,
  handle: `text-[#8899a6]`,
  followButton: `bg-black text-white dark:bg-white dark:text-black px-3 py-1 rounded-full text-xs font-bold`,
};

const Widgets = () => {
  const { trends } = useContext(TwitterContext);

  return (
    <div className={style.wrapper}>
      <div className={style.searchBar}>
        <BiSearch className={style.searchIcon} />
        <input
          placeholder="Search Buzz"
          type="text"
          className={style.inputBox}
        />
      </div>
      <div className={style.section}>
        {trends.length > 0 ? (
          <>
            <div className={style.title}>What's happening</div>
            {trends.slice(0, 5).map((item, index) => (
              <div key={index} className={style.item}>
                <div className={style.newsItemLeft}>
                  <div className={style.newsItemCategory}>
                    {item.domainContext}
                  </div>
                  <div className={style.newsItemTitle}>{item.name}</div>
                  <div className={style.newsItemFooter}>
                    {item.metaDescription}
                  </div>
                </div>
                <div className={style.newsItemRight}>
                  <SlOptions className={style.newsItemIcon} />
                  {/* <img
                src={item.image}
                alt={item.category}
                className={style.newsItemImage}
              /> */}
                </div>
              </div>
            ))}
            <div className={style.showMore}>Show more</div>
          </>
        ) : (
          <div className="relative h-[500px]">
            <div className=" absolute top-[40%] left-[50%] m-auto translate-x-[-50%] translate-y-[-50%] ">
              <svg
                width="57"
                height="57"
                viewBox="0 0 57 57"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#fff"
              >
                <g fill="none" fillRule="evenodd">
                  <g transform="translate(1 1)" strokeWidth="2">
                    <circle cx="5" cy="50" r="5">
                      <animate
                        attributeName="cy"
                        begin="0s"
                        dur="2.2s"
                        values="50;5;50;50"
                        calcMode="linear"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="cx"
                        begin="0s"
                        dur="2.2s"
                        values="5;27;49;5"
                        calcMode="linear"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle cx="27" cy="5" r="5">
                      <animate
                        attributeName="cy"
                        begin="0s"
                        dur="2.2s"
                        from="5"
                        to="5"
                        values="5;50;50;5"
                        calcMode="linear"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="cx"
                        begin="0s"
                        dur="2.2s"
                        from="27"
                        to="27"
                        values="27;49;5;27"
                        calcMode="linear"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle cx="49" cy="50" r="5">
                      <animate
                        attributeName="cy"
                        begin="0s"
                        dur="2.2s"
                        values="50;50;5;50"
                        calcMode="linear"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="cx"
                        from="49"
                        to="49"
                        begin="0s"
                        dur="2.2s"
                        values="49;5;27;49"
                        calcMode="linear"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        )}
        {/* <div className={style.title}>What's happening</div>
        {news.map((item, index) => (
          <div key={index} className={style.item}>
            <div className={style.newsItemLeft}>
              <div className={style.newsItemCategory}>{item.category}</div>
              <div className={style.newsItemTitle}>{item.title}</div>
            </div>
            <div className={style.newsItemRight}>
              <SlOptions className={style.newsItemIcon} />
              <img
                src={item.image}
                alt={item.category}
                className={style.newsItemImage}
              />
            </div>
          </div>
        ))}
        <div className={style.showMore}>Show more</div> */}
      </div>
      <div className={style.section}>
        <div className={style.title}>Who to follow</div>
        {whoToFollow.map((item, index) => (
          <div key={index} className={style.item}>
            <div className={style.followAvatarContainer}>
              <img
                src={item.avatar}
                alt={item.handle}
                className={style.followAvatar}
              />
            </div>
            <div className={style.profileDetails}>
              <div className={style.name}>{item.name}</div>
              <div className={style.handle}>{item.handle}</div>
            </div>
            <div className={style.followButton}>Follow</div>
          </div>
        ))}
        <div className={style.showMore}>Show more</div>
      </div>
    </div>
  );
};

export default Widgets;
