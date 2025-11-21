// /tests/reminders.test.js
import RestClient, { setRestAuth, ids } from "./helpers.js";

export async function testReminders() {
  if (!ids.eventIds.length) {
    console.error("❌ No eventIds found. Run testEvents first.");
    return;
  }

  const reminders = [
    { eventId: ids.eventIds[0], time: "2025-11-25T08:45:00Z" },
    { eventId: ids.eventIds[1], time: "2025-11-26T14:45:00Z" },
  ];

  for (let reminder of reminders) {
    try {
      const res = await RestClient.post(
        "/reminders",
        reminder,
        { headers: { "Content-Type": "application/json" } } // ✅ đảm bảo JSON
      );
      console.log("Create Reminder:", res.data);
      ids.reminderIds.push(res.data.reminder._id);
    } catch (err) {
      console.error(
        "❌ Error creating reminder:",
        err.response?.data || err.message
      );
    }
  }

  try {
    const getRes = await RestClient.get("/reminders");
    console.log("Get Reminders:", getRes.data);
  } catch (err) {
    console.error(
      "❌ Error fetching reminders:",
      err.response?.data || err.message
    );
  }
}

// ⚡ Chạy file trực tiếp
if (import.meta.url === `file://${process.argv[1]}`) {
  (async () => {
    try {
      // 1️⃣ Login trước
      const loginRes = await RestClient.post("/sign-in", {
        email: "admin1@example.com",
        password: "admin123123",
      });
      console.log("Login:", loginRes.data);

      // 2️⃣ Set token cho tất cả request
      setRestAuth(loginRes.data.token);

      ids.userId = loginRes.data.user._id;

      // 3️⃣ Chạy test reminders
      await testReminders();
      console.log("✅ testReminders completed.");
    } catch (err) {
      console.error(
        "❌ Error in testReminders:",
        err.response?.data || err.message
      );
    }
  })();
}
