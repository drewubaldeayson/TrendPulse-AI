import { connect, PageWithCursor } from "puppeteer-real-browser";
import dotenv from "dotenv";

dotenv.config();

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
  const { browser, page } = await connect({ headless: !debugMode });

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

export { scrapeInstagram };
