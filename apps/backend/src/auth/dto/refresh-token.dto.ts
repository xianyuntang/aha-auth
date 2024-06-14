import { IsJWT } from 'class-validator';
import { RefreshTokenRequest } from 'common';

export class RefreshTokenRequestDto implements RefreshTokenRequest {
  @IsJWT()
  token!: string;
}
