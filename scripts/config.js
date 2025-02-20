import { Client } from "@notionhq/client";
import TelegramBot from "node-telegram-bot-api";
// import { HttpsProxyAgent } from "https-proxy-agent";

dotenv.config();

// const proxyPort = process.env.PROXY_PORT || 6666;
// const proxy = `http://127.0.0.1:${proxyPort}`;
// const agent = new HttpsProxyAgent(proxy);

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
  polling: false,
  // request: {
  //   agent,
  // },
});

const TELEGRAM_CHANNEL_NAME = process.env.TELEGRAM_CHANNEL_NAME;
const ANIME_BIRTHDAY_DATABASE_ID = process.env.ANIME_BIRTHDAY_DATABASE_ID;

export { notion, bot, TELEGRAM_CHANNEL_NAME, ANIME_BIRTHDAY_DATABASE_ID };
