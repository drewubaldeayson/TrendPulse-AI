import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { connect, PageWithCursor } from "puppeteer-real-browser";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

dotenv.config();

interface Top50Data {
  lastScraped: string | null;
  data: {
    username: string;
    followers: string;
    engagementRate: string;
  }[];
}

const delay = (timeout: number) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

const loadTop50Data = async (platform: string) => {
  const dataDir = path.join(__dirname, `top50-${platform}.json`);
  if (!fs.existsSync(dataDir)) {
    return { lastScraped: null, data: [] } as Top50Data;
  }
  return JSON.parse(fs.readFileSync(dataDir, "utf8")) as Top50Data;
};

const shouldScrapeTop50Data = (lastScraped: Top50Data["lastScraped"]) => {
  if (!lastScraped) {
    return true;
  }

  const lastDate = new Date(lastScraped);
  const currentDate = new Date();
  const isSameMonth = lastDate.getMonth() === currentDate.getMonth();

  return !isSameMonth;
};

const saveTop50Data = async (data: Top50Data, platform: string) => {
  const dataDir = path.join(__dirname, `top50-${platform}.json`);
  fs.writeFileSync(dataDir, JSON.stringify(data, null, 2));
};

const scrapeTop50Data = async (page: PageWithCursor) => {
  const handles = await page.evaluate(() => {
    const elements = [...document.querySelectorAll("div.handle")].map(
      (handle) => {
        const engagementRate = handle.querySelector(
          "div.misc > div:nth-child(3) > div.value"
        )?.textContent;

        const followers = handle.querySelector(
          "div.misc > div:nth-child(1) > div.value"
        )?.textContent;

        const usernameLink = handle.querySelector(
          "div.name > a"
        ) as HTMLAnchorElement;
        const regex = /\/(?:@)?([^\/]+)\/?$/;
        const hrefMatch = usernameLink?.href.match(regex);
        const username = hrefMatch ? hrefMatch[1] : null;

        return {
          username,
          followers,
          engagementRate,
        };
      }
    );
    return elements;
  });
  return handles;
};

const scrapeTop50Page = async (url: string) => {
  const { browser, page } = await connect({
    headless: process.env.IG_DEBUG_MODE !== "true",
    plugins: [StealthPlugin()],
  });

  try {
    await page.goto(url, { waitUntil: "networkidle2" });
    await delay(1000);
    const data = await scrapeTop50Data(page);
    await browser.close();
    return data;
  } catch (error) {
    await browser.close();
    throw new Error("Scraping failed");
  }
};

const scrapeTop50 = async (platform: string): Promise<Top50Data> => {
  const top50Data = await loadTop50Data(platform);

  if (shouldScrapeTop50Data(top50Data.lastScraped)) {
    const top50Url = `https://phlanx.com/top-lists/${platform}/top-50-followed`;
    const newData = await scrapeTop50Page(top50Url);
    const updatedData = {
      lastScraped: new Date().toISOString(),
      data: newData,
    } as Top50Data;

    saveTop50Data(updatedData, platform);
    return updatedData;
  }

  return top50Data;
};

export { scrapeTop50 };
