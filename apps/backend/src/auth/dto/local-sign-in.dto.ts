import { IsEmail, IsString } from 'class-validator';
import { LocalSignInRequest } from 'common';

export class LocalSignInRequestDto implements LocalSignInRequest {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}
