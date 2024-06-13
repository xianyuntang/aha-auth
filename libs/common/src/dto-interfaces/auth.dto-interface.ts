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
  redirectUrl: string;
  accessToken: string;
  refreshToken: string;
}

export interface SendEmailCodeRequest {
  email: string;
}

export interface CheckEmailCodeRequest {
  email: string;
  code: string;
}

export interface ValidateRedirectUrlRequest {
  clientId: string;
  redirectUrl: string;
}

export interface SendResetPasswordLinkRequest {
  email: string;
}

export interface LinkResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordRequest {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}
