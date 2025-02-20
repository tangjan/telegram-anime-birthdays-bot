function getTodayDate() {
  const today = new Date();
  const utc8Date = new Date(today.getTime() + 8 * 60 * 60 * 1000); // UTC+8
  const month = utc8Date.getUTCMonth() + 1;
  const day = utc8Date.getUTCDate();
  return {
    date: utc8Date.toISOString().split("T")[0],
    month,
    day,
  };
  // return { date: "2025-02-19", month: 2, day: 19 }; // test
}

export { getTodayDate };
