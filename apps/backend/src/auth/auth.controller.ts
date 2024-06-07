import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { SignInResponse } from 'common';

import { Public } from './auth.decorator';
import { LocalSignInCommand, LocalSignUpCommand } from './commands/impl';
import { LocalSignInRequestDto } from './dto/local-sign-in.dto';
import { LocalSignUpRequestDto } from './dto/local-sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Public()
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  localSignIn(
    @Body()
    dto: LocalSignInRequestDto
  ): Promise<SignInResponse> {
    return this.commandBus.execute(
      new LocalSignInCommand(dto.email, dto.password)
    );
  }

  @Public()
  @Post('sign-up')
  @HttpCode(HttpStatus.OK)
  localSignUp(
    @Body()
    dto: LocalSignUpRequestDto
  ): Promise<SignInResponse> {
    return this.commandBus.execute(
      new LocalSignUpCommand(dto.email, dto.password, dto.confirmPassword)
    );
  }
}
