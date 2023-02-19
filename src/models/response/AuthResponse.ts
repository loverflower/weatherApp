export interface IUser {
  email: string;
  isActivated: boolean;
  id: number;
  options: any[];
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  userDto: IUser;
}

export interface OptionResponse {
  option: any;
}
