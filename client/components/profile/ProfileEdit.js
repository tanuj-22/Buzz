import React, { useContext, useEffect, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { BiImageAdd } from "react-icons/bi";
import { useRouter } from "next/router";
import { TwitterContext } from "../../context/TwitterContext";
const style = {
  wrapper: `h-[35rem] w-[25rem] sm:h-[40rem] sm:w-[35rem] text-black dark:text-white bg-primaryBgl dark:bg-primaryBgd rounded-3xl p-10 flex flex-col overflow-y-auto`,
  header: `flex justify-between items-center text-xl md:text-2xl font-bold mb-4`,
  saveButton: `bg-primaryBgd dark:bg-primaryBgl text-white dark:text-black text-lg px-5 py-1 rounded-full hover:bg-primaryHoverDark dark:hover:bg-twitterContrastDark cursor-pointer`,
  cover: `aspect-[3/1] w-full  mb-4 `,
  coverImage: `flex flex-col bg-cover bg-center bg-no-repeat bg-twitterContrastDark/[0.5] h-full w-full bg-blend-multiply`,
  profileImageContainer: `relative bottom-12 left-2 `,
  profileImage: `flex flex-col bg-cover bg-center bg-no-repeat bg-twitterContrastDark/[0.05] h-20 w-20 bg-blend-color  rounded-full outline outline-4 p-2 rounded-full outline-primaryBgl dark:outline-primaryBgd`,
  inputFieldsContainer: `flex-1 text-sm text-twitterContrastDark`,
  inputContainer: `mb-4 outline outline-1 p-2 rounded outline-primaryContrast dark:outline-primaryContrastDark`,
  icon: `rounded-full inline-block mr-8 ease-in text-black dark:text-white text-3xl hover:bg-primaryHover dark:primayHoverDark cursor-pointer`,
  imageIcon: `text-2xl text-white m-auto bg-black/[0.4] hover:bg-black/[0.6] p-2 rounded-full cursor-pointer`,
  fileInput: `hidden`,
  input: `bg-transparent outline-none text-lg w-full text-black dark:text-white`,
};
const ProfileEdit = (props) => {
  const router = useRouter();
  const { currentUser, updateProfile,createUserProfile } = useContext(TwitterContext);
  const [userData, setUserData] = useState(currentUser);
  const editType = props.editType;

  useEffect(() => {
    setUserData(currentUser);
  }, [currentUser]);

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <div>
          <BsArrowLeftShort
            onClick={
              editType && editType === "create"
                ? () => router.back()
                : () => router.push("/profile")
            }
            className={style.icon}
          />
          {editType && editType === "create" ? (
            <span>Create Profile</span>
          ) : (
            <span>Edit Profile</span>
          )}
        </div>
        {editType && editType === "create" ? (
          <>
            <div
              className={style.saveButton}
              onClick={() => {
                createUserProfile(userData);
              }}
            >
              <span>Sign Up</span>
            </div>
          </>
        ) : (
          <div
            className={style.saveButton}
            onClick={() => updateProfile(userData)}
          >
            <span>Save</span>
          </div>
        )}
      </div>

      <div className={style.inputFieldsContainer}>
        <div className={style.cover}>
          <div
            className={style.coverImage}
            style={{ backgroundImage: `url("${userData.coverImage}")` }}
          >
            <label htmlFor="cover-image-upload" className={style.imageIcon}>
              <BiImageAdd />
            </label>
            <input
              type="file"
              id="cover-image-upload"
              className={style.fileInput}
              accept=".png, .jpg, .jpeg"
              placeholder="Image URL"
              onChange={(e) => {
                if (e.target.files[0]) {
                  setUserData({
                    ...userData,
                    coverImage: URL.createObjectURL(e.target.files[0]),
                  });
                }
              }}
            />
          </div>
        </div>
        <div className={style.profileImageContainer}>
          <div
            className={style.profileImage}
            style={typeof userData.profileImage === "undefined" ? {backgroundColor : '#444D53'} :   { backgroundImage: `url("${userData.profileImage}")` }}
          >
            <label htmlFor="profile-image-upload" className={style.imageIcon}>
              <BiImageAdd />
            </label>
            <input
              type="file"
              id="profile-image-upload"
              className={style.fileInput}
              accept=".png, .jpg, .jpeg"
              placeholder="Image URL"
              onChange={(e) => {
                if (e.target.files[0]) {
                  setUserData({
                    ...userData,
                    isProfileImageNft: false,
                    profileImage: URL.createObjectURL(e.target.files[0]),
                  });
                }
              }}
            />
          </div>
        </div>
      </div>
      {editType && editType === "create" ? (
        <></>
      ) : (
        <div className={style.header}>
          <div
            className={style.saveButton}
            onClick={() =>
              router.push(`${router.pathname}/?mint=${userData.walletAddress}`)
            }
          >
            <span>MINT NFT </span>
          </div>
        </div>
      )}

      <div className={style.inputFieldsContainer}>
        <div className={style.inputContainer}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className={style.input}
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />
        </div>
        <div className={style.inputContainer}>
          <label htmlFor="bio">Bio</label>
          <input
            type="text"
            name="bio"
            id="bio"
            className={style.input}
            value={userData.bio}
            onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
          />
        </div>
        <div className={style.inputContainer}>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            id="location"
            className={style.input}
            value={userData.location}
            onChange={(e) =>
              setUserData({ ...userData, location: e.target.value })
            }
          />
        </div>
        {editType && editType === "create" ? (
          <div className={style.inputContainer}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              className={style.input}
              value={userData.username}
              onChange={(e) =>
                setUserData({ ...userData, username: e.target.value })
              }
            />
          </div>
        ) : (
          <div className={style.inputContainer}>
            <label htmlFor="wallet">Wallet</label>
            <input
              type="text"
              name="wallet"
              id="wallet"
              className={style.input}
              value={userData.walletAddress}
              onChange={(e) =>
                setUserData({ ...userData, walletAddress: e.target.value })
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileEdit;
