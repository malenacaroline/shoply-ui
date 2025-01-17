import { User } from "../types";
import axiosInstance from "../utils/axiosConfig";

interface LoginResponse {
  user: User;
}

export const loginApi = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post<LoginResponse>("users/login", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
