export interface UpdateMyProfileRequest {
  firstName: string;
  lastName: string;
}

export interface GetUsersResponse {
  data: {
    id: string;
    email: string;
    signUpAt: string;
    lastSignInAt: string | null;
    signInCount: number;
  }[];
  count: number;
  nextCursor: string | null;
}

export interface GetMeResponse {
  id: string;
  email: string;
  profile: {
    firstName?: string;
    lastName?: string;
  };
}

export interface GetUsersStatisticsResponse {
  count: number;
  average: number;
  active: number;
}
