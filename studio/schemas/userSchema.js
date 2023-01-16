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
      name: "bio",
      title: "Bio",
      type: "string",
    },
    {
      name: "location",
      title: "Location",
      type: "string",
    },
    {
      name: "username",
      title: "Username",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
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
    {
      name: "following",
      title: "Following",
      type: "array",
      of: [{ type: "reference", to: [{ type: "users" }] }],
    },
    {
      name: "followers",
      title: "Followers",
      type: "array",
      of: [{ type: "reference", to: [{ type: "users" }] }],
    },
    {
      name: "activities",
      title: "Activities",
      type: "object",
      fields: [
        {
          name: "likedTweets",
          title: "Liked Tweets",
          type: "array",
          of: [{ type: "reference", to: [{ type: "tweets" }] }],
          validation: Rule => Rule.unique()
        },
        {
          name: "retweetedTweets",
          title: "Retweeted Tweets",
          type: "array",
          of: [{ type: "reference", to: [{ type: "tweets" }] }],
          validation: Rule => Rule.unique()
        },
        {
          name: "repliedTweets",
          title: "Replied Tweets",
          type: "array",
          of: [{ type: "reference", to: [{ type: "tweets" }] }],
          validation: Rule => Rule.unique()
        },
        {
          name: "quotedTweets",
          title: "Quoted Tweets",
          type: "array",
          of: [{ type: "reference", to: [{ type: "tweets" }] }],
          validation: Rule => Rule.unique()
        },
      ],
    },
    {
      name:"bookmarks",
      title:"Bookmarks",
      type:"array",
      of:[{type:"reference", to:[{type:"tweets"}]}]
    },
    {
      name:"lists",
      title:"Lists",
      type:"array",
      of:[{type:"reference", to:[{type:"users"}]}]
    },
    {
      name: "nftsOwned",
      title: "NFTs Owned",
      type: "array",
      of: [{ type: "reference", to: [{ type: "nfts" }] }],
    },
    {
      name: "nftsCreated",
      title: "NFTs Created",
      type: "array",
      of: [{ type: "reference", to: [{ type: "nfts" }] }],
    }

  ],
};
