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
  console.log("Logging in to Instagram...");
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
};

const goToInstagramAccount = async (page: PageWithCursor, account: string) => {
  console.log(`Navigating to Instagram account: ${account}`);

  await page.goto(`https://www.instagram.com/${account}`, {
    waitUntil: "networkidle2",
  });
  await page.waitForSelector("section > div div > a > h2", { timeout: 10000 });
};

const getUsername = async (page: PageWithCursor) => {
  console.log("Getting username...");
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
  console.log("Getting profile picture...");
  return page.evaluate(() => {
    const element = document.querySelector(
      "img[alt*='profile picture']"
    ) as HTMLImageElement;
    const profilePicture = element?.src;

    if (!profilePicture) {
      throw new Error("Profile picture not found.");
    }

    return profilePicture;
  });
};

const getFollowers = async (page: PageWithCursor) => {
  console.log("Fetching followers...");
  const followers = await page.evaluate(() => {
    const element = document.querySelector(
      "a[href='/instagram/followers/'] > span > span"
    ) as HTMLElement;
    const followers = element?.textContent;
    if (!followers) {
      throw new Error("Followers not found.");
    }
    return followers;
  });
  return formatNumber(followers);
};

const loadAllPostsByScrolling = async (
  page: PageWithCursor,
  maxScrolls: number = 2
) => {
  let scrollCount = 0;
  let lastHeight = 0;

  while (scrollCount < maxScrolls) {
    console.log(`Scrolled down to load posts ${scrollCount + 1} times`);

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await delay(2000); // Wait for new content to load

    const newHeight = await page.evaluate(() => document.body.scrollHeight);

    if (newHeight === lastHeight) {
      break;
    }

    lastHeight = newHeight;
    scrollCount++;
  }
};

const getLikesAndComments = async (page: PageWithCursor) => {
  console.log("Fetching posts...");

  let posts = await page.$$("main > div > div:nth-child(3) > div div > a");
  console.log(
    `${posts.length} Posts fetched. Processing likes and comments...`
  );
  const likes: number[] = [];
  const comments: number[] = [];

  for (let i = 0; i < posts.length; i++) {
    posts = await page.$$("main > div > div:nth-child(3) > div div > a");
    const post = posts[i];
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
  }

  return { likes, comments };
};

const scrapeInstagram = async (
  account: string
): Promise<InstagramData | undefined> => {
  console.log("Connecting to browser...");

  const debugMode = process.env.IG_DEBUG_MODE === "true";
  const { browser, page } = await connect({ headless: !debugMode });

  try {
    await loginToInstagram(page);
    await goToInstagramAccount(page, account);

    const username = await getUsername(page);
    const profilePic = await getProfilePicture(page);
    const followers = await getFollowers(page);

    await loadAllPostsByScrolling(page, 2);

    const { likes, comments } = await getLikesAndComments(page);

    const data = { username, profilePic, followers, likes, comments };
    return data;
  } catch (error) {
    console.error(error);
  } finally {
    if (!debugMode) {
      console.log("Closing browser...");
      await browser.close();
    }
  }
};

export { scrapeInstagram };
