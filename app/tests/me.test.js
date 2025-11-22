import RestClient, { setRestAuth } from "./helpers.js";

export async function testUserMe() {
  try {
    console.log("\n=== 🔍 TEST /users/me ===");

    const res = await RestClient.get("/user-info");

    console.log("✅ /users/me response:");
    console.log(res.data);

    if (!res.data.user || !res.data.token) {
      throw new Error("Missing user or token in /users/me response");
    }

    console.log("🎉 TEST PASSED: /users/me ok.");
  } catch (err) {
    console.error(
      "❌ Error testing /users/me:",
      err.response?.data || err.message
    );
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  (async () => {
    try {
      console.log("=== 🔐 Login Before Testing ===");

      const loginRes = await RestClient.post("/sign-in", {
        email: "admin1@example.com",
        password: "admin123123",
      });

      console.log("Login:", loginRes.data);

      const token = loginRes.data.token;

      setRestAuth(token);

      console.log(
        "Headers after setRestAuth:",
        RestClient.defaults.headers.common
      );

      // 3) Test /users/me
      await testUserMe();
    } catch (err) {
      console.error(
        "❌ Error running me.test.js:",
        err.response?.data || err.message
      );
    }
  })();
}
