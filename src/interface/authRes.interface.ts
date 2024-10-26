import { Blog } from "./Blog.interface";

export interface AuthResponse {
  success: boolean;
  data?: Blog[] | Blog
  error?: string;
  status?: number;
}