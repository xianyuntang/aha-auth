import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { SignInResponse } from 'common';

import { LocalSignInCommand } from './commands/impl';
import { LocalSignUpCommand } from './commands/impl/local-sign-up.command';
import { LocalSignInRequestDto } from './dto/local-sign-in.dto';
import { LocalSignUpRequestDto } from './dto/local-sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

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
