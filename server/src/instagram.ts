import { connect, PageWithCursor } from "puppeteer-real-browser";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

dotenv.config();

const TOP_INSTAGRAM_DATA_FILE = path.join(__dirname, "topInstagramData.json");

interface TopInstagramData {
  lastScraped: string | null;
  data: {
    username: string;
    followers: string;
    engagementRate: string;
  }[];
}

const shouldScrape = (lastScraped: TopInstagramData["lastScraped"]) => {
  if (!lastScraped) {
    return true;
  }

  const lastDate = new Date(lastScraped);
  const currentDate = new Date();
  const isSameMonth = lastDate.getMonth() === currentDate.getMonth();

  return !isSameMonth;
};

const loadTopInstagramData = async () => {
  if (!fs.existsSync(TOP_INSTAGRAM_DATA_FILE)) {
    return { lastScraped: null, data: [] } as TopInstagramData;
  }
  return JSON.parse(
    fs.readFileSync(TOP_INSTAGRAM_DATA_FILE, "utf8")
  ) as TopInstagramData;
};

const saveTopInstagramData = async (data: TopInstagramData) => {
  fs.writeFileSync(TOP_INSTAGRAM_DATA_FILE, JSON.stringify(data, null, 2));
};

const scrapeHandles = async (page: PageWithCursor) => {
  const handles = await page.evaluate(() => {
    const elements = [...document.querySelectorAll("div.handle")].map(
      (handle) => {
        const engagementRate = handle.querySelector(
          "div.misc > div:nth-child(3) > div.value"
        )?.textContent;

        const followers = handle.querySelector(
          "div.misc > div:nth-child(1) > div.value"
        )?.textContent;

        const nameLink = handle.querySelector(
          "div.name > a"
        ) as HTMLAnchorElement;
        const regex = /instagram\.com\/(.+)/;
        const hrefMatch = nameLink?.href.match(regex);
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

const scrapePage = async (url: string) => {
  const { browser, page } = await connect({
    headless: process.env.IG_DEBUG_MODE !== "true",
    plugins: [StealthPlugin()],
  });

  try {
    await page.goto(url, { waitUntil: "networkidle2" });
    await delay(1000);
    const data = await scrapeHandles(page);
    await browser.close();
    return data;
  } catch (error) {
    await browser.close();
    throw new Error("Scraping failed");
  }
};

const scrapeTopInstagram = async (): Promise<TopInstagramData> => {
  const topInstagramUrl =
    "https://phlanx.com/top-lists/instagram/top-50-followed";
  const scrapeData = await loadTopInstagramData();

  if (shouldScrape(scrapeData.lastScraped)) {
    const newData = await scrapePage(topInstagramUrl);
    const updatedData = {
      lastScraped: new Date().toISOString(),
      data: newData,
    } as TopInstagramData;

    saveTopInstagramData(updatedData);
    return updatedData;
  }

  return scrapeData;
};

interface InstagramData {
  username: string;
  profilePic: string;
  followers: number;
  averageLikes: number;
  averageComments: number;
  engagementRate: number;
}

const delay = (timeout: number) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

const formatNumber = (text: string | null): number => {
  if (!text) return 0;

  text = text.replace(/,/g, "").trim();

  let value = parseFloat(text);

  if (text.endsWith("K")) {
    value *= 1e3;
  } else if (text.endsWith("M")) {
    value *= 1e6;
  } else if (text.endsWith("B")) {
    value *= 1e9;
  }

  return parseInt(value.toString());
};

const loginToInstagram = async (page: PageWithCursor) => {
  const username = process.env.IG_USERNAME || "";
  const password = process.env.IG_PASSWORD || "";

  if (!username || !password) {
    throw new Error("Instagram username or password not set");
  }

  await page.goto("https://www.instagram.com/accounts/login/", {
    waitUntil: "networkidle2",
  });

  await page.type("input[name='username']", username, { delay: 50 });
  await page.type("input[name='password']", password, { delay: 50 });
  await page.click("button[type='submit']", { delay: 50 });
  await page.waitForNavigation({ waitUntil: "networkidle2" });

  let dismissButton;
  do {
    dismissButton = await page.$('div[aria-label="Dismiss"]');
    if (dismissButton) {
      await Promise.all([
        delay(500),
        dismissButton.click(),
        page.waitForNavigation({ waitUntil: "networkidle2" }),
      ]);
    }
  } while (dismissButton);
};

const goToInstagramAccount = async (page: PageWithCursor, account: string) => {
  await page.goto(`https://www.instagram.com/${account}`, {
    waitUntil: "networkidle2",
  });
  await page.waitForSelector("section > div div > a > h2", { timeout: 10000 });
};

const getUsername = async (page: PageWithCursor) => {
  return page.evaluate(() => {
    const username = document.querySelector(
      "section > div div > a > h2"
    )?.textContent;

    if (!username) {
      throw new Error("Username not found");
    }

    return username;
  });
};

const getProfilePicture = async (page: PageWithCursor) => {
  const element = await page.$("img[alt*='profile picture']");

  if (!element) {
    throw new Error("Profile picture element not found.");
  }

  const profilePictureBase64 = await element.screenshot({ encoding: "base64" });

  return `data:image/png;base64,${profilePictureBase64}`;
};

const getFollowers = async (page: PageWithCursor) => {
  const followers = await page.evaluate(() => {
    const element = document.querySelector("a > span") as HTMLElement;
    const followers = element?.title;
    if (!followers) {
      throw new Error("Followers not found.");
    }
    return followers;
  });
  return formatNumber(followers);
};

const loadAllPostsByScrolling = async (page: PageWithCursor) => {
  const maxScrollCount = parseInt(process.env.IG_MAX_SCROLL_COUNT || "2");
  let scrollCount = 0;
  let lastHeight = 0;

  while (scrollCount < maxScrollCount) {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await delay(2000);

    const newHeight = await page.evaluate(() => document.body.scrollHeight);

    if (newHeight === lastHeight) {
      break;
    }

    lastHeight = newHeight;
    scrollCount++;
  }
};

const getLikesAndComments = async (page: PageWithCursor) => {
  let posts = await page.$$("main > div > div:nth-child(3) > div div > a");
  const likes: number[] = [];
  const comments: number[] = [];

  for (let i = 0; i < posts.length; i++) {
    try {
      posts = await page.$$(
        "main > div > div:nth-child(3) > div > div > div > a"
      );

      const post = posts[i];

      if (!post) continue;

      await post.evaluate((post) => {
        post.scrollIntoView();
      });

      await delay(10);
      await post.hover();
      await delay(10);

      const [like, comment] = await post.evaluate((post) => {
        const elements = post.querySelectorAll("div > ul > li > span");
        const like = elements[0]?.textContent;
        const comment = elements[2]?.textContent;

        if (!like || !comment) {
          throw new Error("Failed to fetch likes and comments.");
        }

        return [like, comment];
      });

      likes.push(formatNumber(like));
      comments.push(formatNumber(comment));
    } catch (error) {
      continue;
    }
  }

  return { likes, comments };
};

const calculateMetrics = (
  followers: number,
  likes: number[],
  comments: number[]
) => {
  const totalLikes = likes.reduce((a, b) => a + b, 0);
  const totalComments = comments.reduce((a, b) => a + b, 0);

  const averageLikes = totalLikes / likes.length;
  const averageComments = totalComments / comments.length;

  const numberOfPosts = likes.length;
  const engagementRate =
    ((totalLikes + totalComments) / (followers * numberOfPosts)) * 100;

  const data = {
    averageLikes,
    averageComments,
    engagementRate,
  };

  return data;
};

const scrapeInstagram = async (
  account: string
): Promise<InstagramData | undefined> => {
  const debugMode = process.env.IG_DEBUG_MODE === "true";
  const { browser, page } = await connect({
    headless: !debugMode,
    plugins: [StealthPlugin()],
  });

  await loginToInstagram(page);
  await goToInstagramAccount(page, account);

  const username = await getUsername(page);
  const profilePic = await getProfilePicture(page);
  const followers = await getFollowers(page);

  await loadAllPostsByScrolling(page);

  const { likes, comments } = await getLikesAndComments(page);

  if (!debugMode) {
    await browser.close();
  }

  const { averageLikes, averageComments, engagementRate } = calculateMetrics(
    followers,
    likes,
    comments
  );

  const data = {
    username,
    profilePic,
    followers,
    averageLikes,
    averageComments,
    engagementRate,
  };

  return data;
};

export { scrapeInstagram, scrapeTopInstagram };
