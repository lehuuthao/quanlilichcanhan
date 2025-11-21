import RestClient, { setRestAuth, ids } from "./helpers.js";

export async function testComments() {
  if (!ids.eventIds[0] || !ids.eventIds[1]) {
    console.error("❌ No eventIds found. Run testEvents first.");
    return;
  }

  const comments = [
    { eventId: ids.eventIds[0], content: "Remember to bring reports" },
    { eventId: ids.eventIds[1], content: "Bring insurance card" },
  ];

  for (let comment of comments) {
    try {
      const res = await RestClient.post("/comments", comment);
      console.log("Create Comment:", res.data);
      ids.commentIds.push(res.data.comment._id);
    } catch (err) {
      console.error(
        "❌ Error creating comment:",
        err.response?.data || err.message
      );
    }
  }

  try {
    const getRes = await RestClient.get(`/comments?eventId=${ids.eventIds[0]}`);
    console.log("Get Comments:", getRes.data);
  } catch (err) {
    console.error(
      "❌ Error fetching comments:",
      err.response?.data || err.message
    );
  }
}

// ⚡ Chạy trực tiếp file
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

      // 3️⃣ Log headers để kiểm tra token
      console.log(
        "Headers after setRestAuth:",
        RestClient.defaults.headers.common
      );

      // 4️⃣ Lưu userId để test các API khác
      ids.userId = loginRes.data.user._id;

      // 5️⃣ Chạy test comments
      await testComments();
      console.log("✅ testComments completed.");
    } catch (err) {
      console.error(
        "❌ Error in testComments:",
        err.response?.data || err.message
      );
    }
  })();
}
