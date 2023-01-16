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
      name: "attachments",
      title: "Attachments",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "type",
              title: "Type",
              type: "string",
            },
            {
              name: "url",
              title: "URL",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      name: "entities",
      title: "Entities",
      type: "object",
      fields: [
        {
          name: "mentions",
          title: "Mentions",
          type: "array",
          of: [
            {
              type: "object",

              fields: [
                {
                  name: "userId",
                  title: "userId",
                  type: "reference",
                  to: [{ type: "users" }],
                },
              ],
            },
          ],
        },
        {
          name: "urls",
          title: "URLs",
          type: "array",
          of: [
            {
              type: "object",

              fields: [
                {
                  name: "url",
                  title: "URL",
                  type: "string",
                },
              ],
            },
          ],
        },
        {
          name: "hashtags",
          title: "Hashtags",
          type: "array",
          of: [
            {
              type: "object",

              fields: [
                {
                  name: "tag",
                  title: "Tag",
                  type: "string",
                },
              ],
            },
          ],
        },
      ],
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
          initialValue: 0,
        },
        {
          name: "reply_count",
          title: "Reply Count",
          type: "number",
          initialValue: 0,
        },
        {
          name: "like_count",
          title: "Like Count",
          type: "number",
          initialValue: 0,
        },
        {
          name: "quote_count",
          title: "Quote Count",
          type: "number",
          initialValue: 0,
        },
      ],
    },
    {
      name: "referenced_tweets",
      title: "Referenced Tweets",
      type: "array",
      of: [
        {
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
              type: "reference",
              to: [{ type: "tweets" }],
            },
          ],
        },
      ],
    },
    {
      name: "likedBy",
      title: "Liked By",
      type: "array",
      of: [{ type: "reference", to: [{ type: "users" }] }],
    },
    {
      name: "retweetedBy",
      title: "Retweeted By",
      type: "array",
      of: [{ type: "reference", to: [{ type: "users" }] }],
    },
    {
      name: "quotedBy",
      title: "Quoted By",
      type: "array",
      of: [
        {
          type: "object",
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
        },
      ],
    },
    {
      name: "repliedBy",
      title: "Replied By",
      type: "array",
      of: [
        {
          type: "object",
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
        },
      ],
    },
  ],
};
