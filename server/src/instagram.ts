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

export { InstagramData };
