import { IsEmail, IsStrongPassword, MaxLength } from 'class-validator';
import { LocalSignUpRequest, MatchesWithProperty } from 'common';

export class LocalSignUpRequestDto implements LocalSignUpRequest {
  @IsEmail()
  @MaxLength(254)
  email!: string;

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
  @MatchesWithProperty(LocalSignUpRequestDto, (dto) => dto.password)
  confirmPassword!: string;
}
