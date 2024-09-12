import { connect, PageWithCursor } from "puppeteer-real-browser";
import dotenv from "dotenv";

dotenv.config();

interface InstagramData {
  username: string;
  profilePic: string;
  followers: number;
  likes: number[];
  comments: number[];
}

const delay = (timeout: number) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

const loginToInstagram = async (page: PageWithCursor) => {
  const username = process.env.IG_USERNAME || "";
  const password = process.env.IG_PASSWORD || "";

  if (!username || !password) {
    throw new Error("Instagram username or password not set");
  }

  await page.goto("https://www.instagram.com/accounts/login/", {
    waitUntil: "networkidle2",
  });
  await page.type("input[name='username']", username, { delay: 100 });
  await page.type("input[name='password']", password, { delay: 100 });
  await page.click("button[type='submit']", { delay: 100 });
  await page.waitForNavigation({ waitUntil: "networkidle2" });
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

const scrapeInstagram = async (account: string) => {
  const debugMode = process.env.IG_DEBUG_MODE === "true";

  const { browser, page } = await connect({ headless: !debugMode });

  try {
    await loginToInstagram(page);
    await goToInstagramAccount(page, account);
    const username = await getUsername(page);
    const data = { username };
    return data;
  } catch (error) {
    console.error(error);
  } finally {
    if (!debugMode) await browser.close();
  }
};

export { scrapeInstagram };
