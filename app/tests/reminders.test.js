import RestClient from "./helpers.js";

export async function testReminders() {
  // Lấy tất cả events hiện có
  const eventsRes = await RestClient.get("/events");
  const allEvents = eventsRes.data.events;

  if (!allEvents.length) {
    console.error("❌ No events found. Please create at least one event.");
    return;
  }

  const reminders = [
    { eventId: allEvents[0]._id, time: "2025-11-25T08:45:00Z" },
    { eventId: allEvents[0]._id, time: "2025-11-26T14:45:00Z" },
  ];

  for (let reminder of reminders) {
    try {
      const res = await RestClient.post("/reminders", reminder, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Create Reminder:", res.data);
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
