import { IsString, MaxLength } from 'class-validator';
import { UpdateMyProfileRequest } from 'common';

export class UpdateUserProfileRequestDto implements UpdateMyProfileRequest {
  @IsString()
  @MaxLength(255)
  firstName!: string;

  @IsString()
  @MaxLength(255)
  lastName!: string;
}
