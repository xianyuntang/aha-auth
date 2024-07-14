export interface LocalSignUpRequest {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LocalSignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ResetPasswordRequest {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

export interface RefreshTokenRequest {
  token: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
}
