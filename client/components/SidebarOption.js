import { useRouter } from "next/router";
const style = {
  wrapper: `w-min flex items-center justify-center rounded-[100px] p-4 mx-auto sm:m-0 cursor-pointer hover:bg-primaryHover dark:hover:bg-primaryHoverDark transition-all hover:duration-200 hover:ease-in-out`,
  iconContainer: `text-2xl lg:text-3xl lg:mr-4`,
  textGeneral: `text-lg font-medium hidden lg:inline`,
  textActive: `text-lg font-bold hidden lg:inline`,
};

function SidebarOption({ text, Icon, isActive, setSelected, redirect }) {
  const router = useRouter();

  return (
    <div
      className={style.wrapper}
      onClick={() => {
        setSelected(text);
        if (redirect) router.push(redirect);
      }}
    >
      <div className={style.iconContainer}>
        <Icon />
      </div>
      <div className={`${isActive ? style.textActive : style.textGeneral}`}>
        {text}
      </div>
    </div>
  );
}
export default SidebarOption;
