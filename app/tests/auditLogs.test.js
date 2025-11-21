// /tests/auditLogs.test.js
import RestClient, { setRestAuth, ids } from "./helpers.js";

export async function testAuditLogs() {
  try {
    if (!ids.userId)
      throw new Error("❌ No userId found. Run login test first.");

    // GET all logs của user
    const res = await RestClient.get(`/audits-logs?userId=${ids.userId}`);
    console.log("Audit Logs:", res.data);

    // GET logs theo action
    // const actionRes = await RestClient.get(`/audit-logs?userId=${ids.userId}&action=CREATE`);
    // console.log("Audit Logs for CREATE:", actionRes.data);
  } catch (err) {
    console.error(
      "❌ Error in testAuditLogs:",
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

      // 3️⃣ Chạy test audit logs
      await testAuditLogs();
      console.log("✅ testAuditLogs completed.");
    } catch (err) {
      console.error(
        "❌ Error running auditLogs test:",
        err.response?.data || err.message
      );
    }
  })();
}
