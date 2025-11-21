import { testTags } from "./tags.test.js";
import { testEvents } from "./events.test.js";
import { testComments } from "./comments.test.js";
import { testReminders } from "./reminders.test.js";
import RestClient, { setRestAuth, ids } from "./helpers.js";
import { testAuditLogs } from "./auditLogs.test.js";

(async () => {
  try {
    // Login
    const loginRes = await RestClient.post("/sign-in", {
      email: "admin1@example.com",
      password: "admin123123",
    });
    console.log("Login:", loginRes.data);

    setRestAuth(loginRes.data.token);
    ids.userId = loginRes.data.user._id;

    // Chạy lần lượt
    await testTags();
    await testEvents();
    await testComments();
    await testReminders();
    await testAuditLogs();
    await testAuth();

    console.log("✅ All tests completed successfully.");
  } catch (err) {
    console.error("❌ Error running tests:");
  }
})();
