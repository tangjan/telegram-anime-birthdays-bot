import { bot, notion, TELEGRAM_CHANNEL_NAME } from "./config.js";
import { getTodayDate } from "./date.js";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

async function sendBirthdayMessages(characters) {
  const { month, day } = getTodayDate();

  // 标题消息
  const titleMessage = `🎉 二次元小伙伴们的生日：${month}月${day}日`;
  try {
    await bot.sendMessage(TELEGRAM_CHANNEL_NAME, titleMessage);
  } catch (error) {
    console.error("Error sending message to Telegram:", error);
    return;
  }

  // 生日消息
  for (const character of characters) {
    const name = character.properties["Name"].title[0]?.plain_text;

    const pageUrl = character.url;
    const nameText = `<a href="${pageUrl}">${name}</a>`;

    try {
      const { results } = await notion.blocks.children.list({
        block_id: character.id,
      });

      for (const block of results) {
        if (block.type === "image") {
          const imageUrl = block.image.file?.url || block.image.external?.url;
          console.log("imageUrl", imageUrl);
          if (imageUrl) {
            await bot.sendPhoto(TELEGRAM_CHANNEL_NAME, imageUrl, {
              caption: `${nameText}`,
              parse_mode: "HTML",
            });
          }
        }
      }
    } catch (error) {
      console.error("Error fetching character image:", error);
    }
  }

  // 总结消息
  try {
    const scharaUrl = `https://schara.sunrockgo.com/birthday?b=${String(
      month
    ).padStart(2, "0")}${String(day).padStart(2, "0")}`;
    const acdbUrl = `https://www.animecharactersdatabase.com/birthdays.php?theday=${day}&themonth=${
      MONTHS[month - 1]
    }`;

    await bot.sendMessage(
      TELEGRAM_CHANNEL_NAME,
      `✨ ${month}月${day}日${
        characters.length > 0
          ? `共有 ${characters.length} 位小伙伴过生日`
          : "没有小伙伴过生日"
      }\n\n` +
        `📚 更多角色生日信息：\n` +
        `• <a href="${scharaUrl}">${month}月${day}日生まれのキャラクター誕生日 - schara.sunrockgo.com</a>\n` +
        `• <a href="${acdbUrl}">Characters born on ${
          MONTHS[month - 1]
        } ${day}th - animecharactersdatabase.com</a>\n` +
        `• <a href="https://www.instagram.com/birthdayofanime/">Instagram @birthdayofanime</a>`,
      {
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }
    );
  } catch (error) {
    console.error("Error sending summary message:", error);
  }

  console.log("生日消息已发送到Telegram频道");
}

export { sendBirthdayMessages };
