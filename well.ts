// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};
async function scrapeTwitterTrending(): Promise<string> {
  // URL of the page to scrape trending data from
  return new Promise(async (resolve, reject) => {
    const { exec, spawn } = require("node:child_process");
    let data: string = "";
    exec("webscraping/scrape.sh", (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        resolve(err);
      }
      data += stdout;
      console.log(data);
    });
    return resolve(data);
  });
}
async function scrapeTwitterTrending1(): string {
  // URL of the page to scrape trending data from
}
async function scrapeTwitterTrending2(): Promise<string> {
  return new Promise((resolve) => {
    const { exec, spawn } = require("node:child_process");
    let data: string = "";
    exec("webscraping/scrape.sh", (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      data += stdout;
      console.log(data);
    });
    // resolve(data);
    setTimeout(() => {
      resolve(data);
    }, 30000);
  });
}
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   const data = await scrapeTwitterTrending();
//   res.status(200).json({ name: data.toString() });
// }
export default async function handler(req, res) {
  try {
    const result = await scrapeTwitterTrending2();
    console.log(result);
    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
