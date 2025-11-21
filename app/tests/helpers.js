// /tests/helpers.js
import axios from "axios";

export const RestClient = axios.create({
  baseURL: process.env.NEXT_ORIGIN_URL || "http://localhost:3000/api",
  timeout: 90000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const setRestAuth = (token) => {
  if (token) {
    RestClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    RestClient.defaults.headers.common["authorization"] = `Bearer ${token}`;
  }
};

export const deleteAuthorization = () => {
  delete RestClient.defaults.headers.common["Authorization"];
};

export const ids = {
  userId: "",
  tagIds: [],
  eventIds: [],
  commentIds: [],
  reminderIds: [],
};

export default RestClient;
