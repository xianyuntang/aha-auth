export interface AuthorizedUser {
  id: string;
  email: string;
  profile: Partial<{
    lastName: string;
    firstName: string;
  }>;
  oauth: boolean;
}

export interface JwtTokenPayload {
  sub: string;
  user: AuthorizedUser;
  iat: number;
  exp: number;
}
