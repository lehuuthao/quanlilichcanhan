export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignUpPayload {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  userName: string;
}

export interface UserResponse {
  user: User;
  token: string;
}
