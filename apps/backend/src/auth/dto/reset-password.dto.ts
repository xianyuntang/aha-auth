import { IsString, IsStrongPassword, MaxLength } from 'class-validator';
import { MatchesWithProperty, ResetPasswordRequest } from 'common';

export class ResetPasswordRequestDto implements ResetPasswordRequest {
  @IsString()
  oldPassword!: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  // For the bcrypt limitation
  @MaxLength(72)
  password!: string;

  // Make share confirmPassword is equal to password
  @MatchesWithProperty(ResetPasswordRequestDto, (dto) => dto.password)
  confirmPassword!: string;
}
