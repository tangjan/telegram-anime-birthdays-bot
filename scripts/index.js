import { queryBirthdays } from "./notion.js";
import { sendBirthdayMessages } from "./telegram.js";

async function main() {
  const birthdays = await queryBirthdays();
  await sendBirthdayMessages(birthdays);
}

main().catch(console.error);
