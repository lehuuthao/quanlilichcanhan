import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { isEmpty } from "lodash";
import { IUser } from "@/app/api/_models/user";

interface AuthUser {
  _id: string; // phải trùng với _id trong DB
  name: string;
  email: string;
  role: string;
}

export async function authenticate(request: NextRequest): Promise<AuthUser> {
  const authHeader =
    request.headers.get("Authorization") ||
    request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) throw new Error("Unauthorized");

  const token = authHeader.split(" ")[1];
  if (!token) throw new Error("Unauthorized");

  const payload = jwt.verify(
    token,
    process.env.JWT_SECRET || "jwt-secret"
  ) as AuthUser;

  if (!payload?._id) throw new Error("Unauthorized");

  return payload;
}
