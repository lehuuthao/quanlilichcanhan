import RestClient from "./rest-client";
import get from "lodash/get";
import cookie from "js-cookie";
import { AUTH_KEY } from "@/constants/auth.constant";
import { User, LoginPayload, SignUpPayload, UserResponse } from "@/types";
import { redirect } from "next/navigation";

const signUp = async (payload: SignUpPayload): Promise<UserResponse> => {
  try {
    const response = await RestClient.post("/api/sign-up", payload);
    return response.data;
  } catch (error) {
    const errorMess = get(error, ["response", "data", "message"]);
    throw errorMess;
  }
};

const login = async (payload: LoginPayload): Promise<UserResponse> => {
  try {
    const response = await RestClient.post(`/api/sign-in`, payload);
    return response.data;
  } catch (error) {
    const errorMess = get(error, ["response", "data", "message"]);
    throw errorMess;
  }
};

const getUserInfo = async (): Promise<UserResponse> => {
  try {
    const response = await RestClient.get(`/api/user-info`);
    return response.data;
  } catch (error) {
    if (
      get(error, ["response", "data", "status"]) !== 500 &&
      typeof window !== "undefined"
    ) {
      cookie.remove(AUTH_KEY);
      redirect("/login");
    }
    const errorMess = get(error, ["response", "data", "message"]);
    throw errorMess;
  }
};

const UsersServices = {
  signUp,
  login,
  getUserInfo,
};

export default UsersServices;
