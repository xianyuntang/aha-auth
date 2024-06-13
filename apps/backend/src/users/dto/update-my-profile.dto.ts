import { IsString } from 'class-validator';
import { UpdateMyProfileRequest } from 'common';

export class UpdateUserProfileRequestDto implements UpdateMyProfileRequest {
  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;
}
