import { IsString } from 'class-validator';

export class UpdateUserProfileRequestDto {
  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;
}
