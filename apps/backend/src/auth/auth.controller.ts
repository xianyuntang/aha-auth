import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { SignInResponse } from 'common';
import { Response } from 'express';
import { Profile } from 'passport-google-oauth20';

import { CurrentUser, Public } from './auth.decorator';
import {
  LocalSignInCommand,
  LocalSignUpCommand,
  OauthSignInCommand,
} from './commands/impl';
import { LocalSignInRequestDto } from './dto/local-sign-in.dto';
import { LocalSignUpRequestDto } from './dto/local-sign-up.dto';
import { GoogleOAuthGuard } from './guards/google-oauth.guard';

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

  @Public()
  @Post('sign-in/google')
  @UseGuards(GoogleOAuthGuard)
  googleSignIn() {
    return undefined;
  }

  @Public()
  @Get('sign-in/google/callback')
  @UseGuards(GoogleOAuthGuard)
  async googleSignInCallback(
    @Res({ passthrough: true }) res: Response,
    @CurrentUser() user: Profile
  ) {
    const url = await this.commandBus.execute<OauthSignInCommand, string>(
      new OauthSignInCommand(user)
    );
    res.setHeader('Location', url);
  }
}
