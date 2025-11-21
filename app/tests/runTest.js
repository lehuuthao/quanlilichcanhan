// /tests/runAll.test.js
import { testEvents } from "./events.test.js";
import { testReminders } from "./reminders.test.js";
import RestClient, { setRestAuth, ids } from "./helpers.js";

(async () => {
  try {
    // 1️⃣ Login
    const loginRes = await RestClient.post("/sign-in", {
      email: "admin1@example.com",
      password: "admin123123",
    });
    console.log("Login:", loginRes.data);

    // 2️⃣ Set token cho tất cả request
    setRestAuth(loginRes.data.token);
    ids.userId = loginRes.data.user._id;

    // 3️⃣ Chạy test events trước
    await testEvents();

    // 4️⃣ Chạy test reminders sau
    await testReminders();

    console.log("✅ All tests completed.");
  } catch (err) {
    console.error("❌ Error running tests:", err.response?.data || err.message);
  }
})();
