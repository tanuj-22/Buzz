export const nftSchema = {
    name: "nfts",
    title: "NFTs",
    type: "document",
    fields: [
        {
            name: "name",
            title: "Name",
            type: "string",
        },
        {
            name: "description",
            title: "Description",
            type: "string",
        },
        {
            name: "imageUri",
            title: "Image URI",
            type: "string",
        },
        {
            name: "creator",
            title: "Creator",
            type: "reference",
            to: [{ type: "users" }],
        },
        {
            name: "owner",
            title: "Owner",
            type: "reference",
            to: [{ type: "users" }],
        },
    ],
};