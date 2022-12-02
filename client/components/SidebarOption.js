const style = {
  wrapper: `w-min flex items-center justify-center rounded-[100px] p-4 mx-auto sm:m-0 cursor-pointer hover:bg-[#333c45] transition-all hover:duration-200 hover:ease-in-out`,
  iconContainer: `text-xl xl:mr-4`,
  textGeneral: `font-medium hidden xl:inline`,
  textActive: `font-bold hidden xl:inline`,
};

function SidebarOption({ text, Icon, isActive, setSelected, redirect }) {
  return (
    <div className={style.wrapper} onClick={() => setSelected(text)}>
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
