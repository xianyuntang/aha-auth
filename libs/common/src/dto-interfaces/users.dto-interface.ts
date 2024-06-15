export interface UpdateMyProfileRequest {
  firstName: string;
  lastName: string;
}

export interface GetUsersResponse {
  data: {
    id: string;
    email: string;
    signUpAt: string;
    lastSignInAt: string;
    signInCount: number;
  }[];
  count: number;
  nextCursor: string | null;
}
