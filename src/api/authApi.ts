import api from "./axios";

export type AppRole = "admin" | "teacher" | "student" | "client";

interface LaravelRole {
  id: number;
  name: string;
  status: string;
}

interface LaravelLoginUser {
  id: number;
  email: string;
  name: string;
  role_id: number;
  status: string;
  role: LaravelRole | null;
}

interface LaravelLoginResponse {
  status: boolean;
  code: number;
  message: string;
  data: {
    token_type: string;
    access_token: string;
    login_user: LaravelLoginUser;
  };
}

export interface LoginResult {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: AppRole;
  };
}

const normalizeRole = (roleName?: string): AppRole => {
  const value = roleName?.toLowerCase();
  if (value === "admin") return "admin";
  if (value === "teacher") return "teacher";
  if (value === "client") return "client";
  return "student";
};

export const loginApi = async (email: string, password: string): Promise<LoginResult> => {
  const response = await api.post<LaravelLoginResponse>("/login", { email, password });
  const payload = response.data.data;

  return {
    token: payload.access_token,
    user: {
      id: String(payload.login_user.id),
      name: payload.login_user.name,
      email: payload.login_user.email,
      role: normalizeRole(payload.login_user.role?.name),
    },
  };
};

export const logoutApi = async () => {
  return api.post("/logout");
};
