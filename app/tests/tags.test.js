// /tests/tags.test.js
import RestClient, { setRestAuth, ids } from "./helpers.js";

export async function testTags() {
  const tags = [
    { name: "Work", color: "#ff0000" },
    { name: "Personal", color: "#00ff00" },
  ];

  for (let tag of tags) {
    try {
      const res = await RestClient.post("/tags", tag);
      console.log("Create Tag:", res.data);
      ids.tagIds.push(res.data.tag._id);
    } catch (err) {
      console.error(
        "❌ Error creating tag:",
        err.response?.data || err.message
      );
    }
  }

  try {
    const getRes = await RestClient.get("/tags");
    console.log("Get Tags:", getRes.data);
  } catch (err) {
    console.error("❌ Error fetching tags:", err.response?.data || err.message);
  }
}

// ⚡ Chạy file trực tiếp
if (import.meta.url === `file://${process.argv[1]}`) {
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

      // 3️⃣ Log headers để kiểm tra
      console.log(
        "Headers after setRestAuth:",
        RestClient.defaults.headers.common
      );

      // 4️⃣ Lưu userId để test các API khác
      ids.userId = loginRes.data.user._id;

      // 5️⃣ Chạy test tags
      await testTags();
      console.log("✅ testTags completed.");
    } catch (err) {
      console.error("❌ Error in testTags:", err.response?.data || err.message);
    }
  })();
}
