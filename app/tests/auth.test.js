import RestClient, { setRestAuth, ids } from "./helpers.js";
export async function testAuth() {
  const res = await RestClient.post("/sign-in", {
    email: "admin1@example.com",
    password: "admin123123",
  });

  console.log("Login:", res.data);

  // Gán token cho tất cả request tiếp theo
  setRestAuth(res.data.token);
}
