// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};
async function scrapeTwitterTrending(): Promise<string> {
  // URL of the page to scrape trending data from
  return new Promise(async (resolve, reject) => {
    const url = "https://twitter.com/explore/tabs/trending";

    // Make request to the URL
    const response = await fetch(url);
    const htmlString = await response.text();
    const data = htmlString;

    return resolve(data);
  });
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = await scrapeTwitterTrending();
  res.status(200).json({ name: data });
}
