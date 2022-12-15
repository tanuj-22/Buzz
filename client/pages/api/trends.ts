// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
const filepath = path.join(process.cwd(), "webscraping/trending_topics.json");
const filepathsh = path.join(process.cwd(), "webscraping/scrape.sh");

const pydata: string = `from snscrape.modules import twitter
import json


max_results = 100

def scrape_trends():
    scraper = twitter.TwitterTrendsScraper()
    return scraper

json_output = []

for i,tweet in enumerate(scrape_trends().get_items()):
    if i > max_results:
        break
    json_output.append(tweet.json())

with open ('webscraping/trending_topics.json', 'w') as f:
    f.write('[')
    for i,item in enumerate(json_output):

        if i == len(json_output)-1:
            f.write("%s" % item)
        else:
            f.write("%s " % item)
            f.write(',\n')
            f.flush()
    f.write(']')

print(json_output)`;

async function runScript() {
  return new Promise(async (resolve, reject) => {
    const { exec, spawn } = require("node:child_process");
    let dataToSend: string = "";
    // exec(filepathsh, (err :unknown, stdout : unknown, stderr:unknown) : void => {
    //   if (err) {
    //     console.error(err);
    //     return;
    //   }
    //   data += stdout;
    //   console.log(data);
    // });
    // const curl = spawn('curl', ['https://raw.githubusercontent.com/tanuj-22/BE-COMP-LP3/main/abc.sh', '-o', 'abc.sh']);
    exec(
      "python /temp/getTrends.py",
        // "sudo apt-get install python3",
      (error: unknown, stdout: unknown, stderr: unknown) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
      }
    );

    // let python = spawn('python', ['webscraping/getTrends.py']);
    // let dataToSend = '';
    // python.on('error', (err : unknown) => {
    //     console.log(err);
    // });
    // for await (const data of python.stdout){
    //   //console.log(data.toString());
    //   dataToSend += data.toString()
    // }
    // console.log(dataToSend);

    resolve(dataToSend);
  });
}

const getFileStats = async (): Promise<number> => {
  const fs = require("fs");
  const endDate: number = new Date().valueOf();
  return new Promise((resolve, reject) => {
    try {
      let data: number = 0;
      const stats = fs.statSync(filepath);
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

      fs.readFile(filepath, "utf8", (err: unknown, data: string) => {
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

const getTrends = async () => {
  try {
    const stat: number = await getFileStats();
    console.log(stat);

    if (stat > 0) {
      await runScript();
      const data = await readFileData();
      return JSON.parse(data);
    } else {
      const data = await readFileData();
      return JSON.parse(data);
    }
  } catch (err) {
    console.log(err);
  }
};
const writeToFile = async (data: string) => {
  const fs = require("fs");
  return new Promise((resolve, reject) => {
    try {
      fs.writeFile("/tmp/getTrends.py", data, (err: unknown) => {
        if (err) {
          console.log(err);

          reject(err);
        }
        resolve("success");
      });
    } catch (err) {
      reject(err);
    }
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await writeToFile(pydata).then(async () => {
      await getTrends().then(async (data) => {
        res.status(200).json({ data });
      });
    });
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
