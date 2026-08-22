export interface User {
  id: string;
  username: string;
  email: string;
  email_verified?: boolean;
  created_at?: string;
  updated_at?: string;
  memoji?: number;
  gender: number;
  image?: string | null;
}

export interface GetUserResponse {
  success: boolean;
  message?: string;
  data?: User;
  user: User;
}

export interface ListUsersResponse {
  success?: boolean;
  data?: User[];
  message?: string;
}

export interface ProfileFormValues {
  username: string;
  email: string;
}

export type UpdateMeUserPatch = Partial<Pick<User, "username" | "email">> & Record<string, unknown>;

export interface UpdateMeRequest {
  username?: string | null;
  image?: string | null;
  memoji?: number | null;
  gender?: number | null;
}

export type UpdateMeResponse = GetUserResponse;

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message?: string;
}
