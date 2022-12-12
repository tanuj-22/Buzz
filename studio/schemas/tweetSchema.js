export const tweetSchema = {
  name: "tweets",
  title: "Tweets",
  type: "document",
  fields: [
    {
      name: "tweet",
      title: "Tweet",
      type: "string",
    },
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "users" }],
    },
    {
      name: "timestamp",
      title: "Timestamp",
      type: "datetime",
    },
    {
      name: "public_metrics",
      title: "Public Metrics",
      type: "object",
      fields: [
        {
          name: "retweet_count",
          title: "Retweet Count",
          type: "number",
        },
        {
          name: "reply_count",
          title: "Reply Count",
          type: "number",
        },
        {
          name: "like_count",
          title: "Like Count",
          type: "number",
        },
        {
          name: "quote_count",
          title: "Quote Count",
          type: "number",
        },
      ],
    },
    {
      name: "referenced_type",
      title: "Referenced Type",
      type: "object",
      fields: [
        {
          name: "type",
          title: "Type",
          type: "string",
        },
        {
          name: "id",
          title: "ID",
          type: "string",
        },
      ],
    },
  ],
};
