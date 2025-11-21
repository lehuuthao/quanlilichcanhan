// /tests/masterTest.js
import { testAuth } from "./auth.test.js";
import { testTags } from "./tags.test.js";
import { testEvents } from "./events.test.js";
import { testComments } from "./comments.test.js";
import { testReminders } from "./reminders.test.js";
import { testAuditLogs } from "./auditLogs.test.js";

async function runAllTests() {
  try {
    await testAuth();
    await testTags();
    await testEvents();
    await testComments();
    await testReminders();
    await testAuditLogs();
    console.log("✅ All API tests completed.");
  } catch (err) {
    console.error(
      "❌ Error during API tests:",
      err.response?.data || err.message
    );
  }
}

runAllTests();
