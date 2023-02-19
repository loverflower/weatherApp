import $api, { BASE_URL } from "../http";
import axios, { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";

export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/login", { email, password });
  }

  static async registration(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/registration", { email, password });
  }

  static async addOption(options: any): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/options", options);
  }

  static async logout(): Promise<void> {
    return $api.post("/logout");
  }

  static async checkAuth(): Promise<AxiosResponse<AuthResponse>> {
    const response = await axios.get<AuthResponse>(`${BASE_URL}refresh`, {
      withCredentials: true,
    });
    return response;
  }
}
