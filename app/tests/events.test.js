// /tests/events.test.js
import RestClient, { setRestAuth, ids } from "./helpers.js";

export async function testEvents() {
  try {
    if (!ids.userId)
      throw new Error("❌ No userId found. Run login test first.");

    console.log("➡️ Running Events tests...");

    // 1️⃣ Tạo event mới
    const newEvent = {
      title: "Test Event",
      description: "This is a test event",
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 3600000).toISOString(), // +1h
      tags: [], // nếu muốn test với tag, điền ObjectId của tag
      status: "pending",
    };

    const createRes = await RestClient.post("/events", newEvent);
    console.log("Event Created:", createRes.data);
    const eventId = createRes.data.event._id;
    ids.eventId = eventId; // lưu ID để test PUT/DELETE

    // 2️⃣ Lấy tất cả events của user
    const getRes = await RestClient.get("/events");
    console.log("All Events:", getRes.data);

    // 3️⃣ Cập nhật event vừa tạo
    const updateData = { title: "Updated Test Event", status: "done" };
    const updateRes = await RestClient.put(`/events/${eventId}`, updateData);
    console.log("Event Updated:", updateRes.data);

    // 4️⃣ Xóa event vừa tạo
    const deleteRes = await RestClient.delete(`/events/${eventId}`);
    console.log("Event Deleted:", deleteRes.data);

    console.log("✅ testEvents completed successfully.");
  } catch (err) {
    console.error("❌ Error in testEvents:", err.response?.data || err.message);
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

      // 3️⃣ Chạy test events
      await testEvents();
    } catch (err) {
      console.error(
        "❌ Error running events test:",
        err.response?.data || err.message
      );
    }
  })();
}
