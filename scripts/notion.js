import { notion, ANIME_BIRTHDAY_DATABASE_ID } from "./config.js";
import { getTodayDate } from "./date.js";

async function queryBirthdays() {
  try {
    const { date } = getTodayDate();
    const response = await notion.databases.query({
      database_id: ANIME_BIRTHDAY_DATABASE_ID,
      filter: {
        property: "生日",
        formula: {
          date: {
            equals: date,
          },
        },
      },
    });

    return response.results;
  } catch (error) {
    console.error("Error querying Notion database:", error);
    return [];
  }
}

export { queryBirthdays };
