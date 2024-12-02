export type AuthParamType = {
  email: string;
  password: string;
};

export type FormDataType = {
  email: string;
  password: string;
};

export interface ServerResponse {
  token: string | undefined;
}

export interface LoginRequest {
  email: string;
  password: string;
}
