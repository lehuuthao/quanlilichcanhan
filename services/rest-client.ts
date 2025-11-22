// /tests/helpers.ts
import axios from "axios";
import isNil from "lodash/isNil";

// Tạo instance Axios chung cho tất cả test
export const RestClient = axios.create({
  baseURL: process.env.NEXT_ORIGIN_URL || "http://localhost:3000/api",
  timeout: 90000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Hàm set token cho tất cả request
export const setRestAuth = (token: string) => {
  if (!isNil(token)) {
    RestClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    // RestClient.defaults.headers.common["authorization"] = `Bearer ${token}`;
  }
};

// Hàm xóa token (logout/reset)
export const deleteAuthorization = () => {
  delete RestClient.defaults.headers.common["Authorization"];
  // delete RestClient.defaults.headers.common["authorization"];
};

// IDs để lưu test data giữa các test
export const ids = {
  userId: "",
  tagIds: [] as string[],
  eventIds: [] as string[],
  commentIds: [] as string[],
  reminderIds: [] as string[],
};

export default RestClient;
