// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

interface ResponseData {
  message: any;
}

async function runScript() {
  return new Promise((resolve, reject) => {
    resolve(getFileStats());
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
    resolve(data);
  });
}

const getFileStats = async (): Promise<number> => {
  const fs = require("fs");
  const endDate: number = new Date().valueOf();
  return new Promise((resolve, reject) => {
    try {
      let data: number = 0;
      const stats = fs.statSync("webscraping/trending_topics.json");
      data += (endDate - new Date(stats.mtime).valueOf()) / 1000 / 60;

      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
};
const readFileData = async (): Promise<string> => {
  let data: string = "";
  const fs = require("fs");
  return new Promise((resolve, reject) => {
    try {
      //   data = fs.readFileSync("webscraping/trending_topics.json", "utf8");
      fs.readFile("webscraping/trending_topics.json", "utf8", (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    } catch (err) {
      reject(err);
    }
  });
};

const getTrends = async (): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const stat: number = await getFileStats();
      console.log(stat);

      if (stat > 50) {
        await runScript();
        const data = await readFileData();
        resolve(JSON.parse(data));
      } else {
        const data = await readFileData();
        resolve(JSON.parse(data));
      }
    } catch (err) {
      reject(err);
    }
  });
};

export default async function handler(req: any, res: any) {
  //   const execSync = require("child_process").execSync;
  //   const pythonProcess = execSync("source /Users/tanuj/miniforge3/bin/activate","python3 webscraping/test.py");
  // await new Promise(async (resolve) =>
  //   setTimeout(async () => {
  //     const data = await getTrends();

  //     resolve(res.append("Access-Control-Allow-Origin", "*").json({ message: data }));
  //   }, 1000)
  // );
  // return res.end();

  try {
    const result = await getTrends();
    if (result) {
      res.status(200).json({ result });
    }
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
