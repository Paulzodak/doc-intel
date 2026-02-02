export interface User {
  id: string;
  username: string;
  email: string;
  email_verified?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface GetUserResponse {
  success: boolean;
  message?: string;
  data?: User;
}
