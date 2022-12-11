export const userSchema = {
  name: "users",
  title: "Users",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "walletAddress",
      title: "Wallet Address",
      type: "string",
    },
    {
      name: "profileImage",
      title: "Profile Image",
      type: "string",
    },
    {
      name: "isProfileImageNft",
      title: "Is Profile Image NFT",
      type: "boolean",
    },
    {
      name: "coverImage",
      type: "string",
      title: "Cover Image",
    },
    {
      name: "tweets",
      title: "Tweets",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tweets" }] }],
    },
  ],
};