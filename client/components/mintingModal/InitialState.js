import { GiEarthAmerica } from "react-icons/gi";
const style = {
  wrapper: `h-[15rem] w-[25rem] sm:h-[20rem] sm:w-[35rem] text-white bg-[#15202b] rounded-3xl p-10 flex flex-col`,
  inputFieldsContainer: `flex-1`,
  inputContainer: `mb-4`,
  fileInput: `hidden`,
  input: `bg-transparent outline-none text-xl w-full`,
  customInput: `bg-white text-black px-3 py-1 rounded-full hover:bg-[#8899a6] cursor-pointer`,
  fileSelected: `bg-[#2b6127] text-white px-3 py-1 rounded-full hover:bg-[#8899a6] cursor-pointer`,
  lower: `flex justify-between items-center`,
  visibility: `flex items-center text-[#1d9bf0] text-sm font-bold`,
  visibilityText: `ml-2`,
  mintButton: `bg-white text-black px-3 py-1 rounded-full hover:bg-[#8899a6] cursor-pointer`,
  inactiveMintButton: `text-black px-3 py-1 rounded-full bg-[#8899a6]`,
};

const InitialState = ({
  profileImage,
  setProfileImage,
  name,
  setName,
  description,
  setDescription,
  mint,
}) => {
  

  return (
    <div className={style.wrapper}>
      <div className={style.inputFieldsContainer}>
        <div className={style.inputContainer}>
          <label
            htmlFor="image-upload"
            className={profileImage ? style.fileSelected : style.customInput}
          >
            {profileImage ? "File Selected" : "Select File"}
          </label>
          <input
            type="file"
            id="image-upload"
            className={style.fileInput}
            accept=".png, .jpg, .jpeg"
            placeholder="Image URL"
            onChange={(e) => setProfileImage(e.target.files[0])}
          />
        </div>
        <div className={style.inputContainer}>
          <input
            type="text"
            placeholder="Title Of Image "
            className={style.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={style.inputContainer}>
          <input
            type="text"
            placeholder="Description"
            className={style.input}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <div className={style.lower}>
        <div className={style.visibility}>
          <GiEarthAmerica />
          <span className={style.visibilityText}>Everyone</span>
        </div>
        <div
          className={
            profileImage && name && description
              ? style.mintButton
              : style.inactiveMintButton
          }
          onClick={() => {
            if (profileImage && name && description) {
              mint();
            }
          }}
        >
          Mint
        </div>
      </div>
    </div>
  );
};

export default InitialState;
