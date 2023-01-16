export const likeSchema = {
  name: "likes",
  title: "Likes",
  type: "document",
  fields: [
    {
      name: "tweetId",
      title: "Tweet ID",
      type: "reference",
      to: [{ type: "tweets" }],
    },
    {
      name: "userId",
      title: "User ID",
      type: "reference",
      to: [{ type: "users" }],
    },
  ],
};
