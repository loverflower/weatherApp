import $api from "../http";
import { AxiosResponse } from "axios";
import { OptionResponse } from "../models/response/AuthResponse";

export default class OptionService {
  static async addOption(
    option: any
  ): Promise<AxiosResponse<OptionResponse[]>> {
    return $api.post<OptionResponse[]>("/options", option);
  }

  static async deleteOption(
    id: string,
    userId: number
  ): Promise<AxiosResponse<OptionResponse[]>> {
    return $api.delete<OptionResponse[]>(`/options/${id}`, {
      data: { userId },
    });
  }

  static async getOptions(
    id: number
  ): Promise<AxiosResponse<OptionResponse[]>> {
    return $api.get<OptionResponse[]>(`/options/${id}`);
  }
}
