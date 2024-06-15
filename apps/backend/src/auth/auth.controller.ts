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
import { AuthorizedUser, SignInResponse } from 'common';
import { Response } from 'express';
import { Profile } from 'passport-google-oauth20';

import { CurrentUser, Public } from './auth.decorator';
import {
  LocalSignInCommand,
  LocalSignUpCommand,
  OauthSignInCommand,
  RefreshTokenCommand,
  ResetPasswordCommand,
} from './commands/impl';
import {
  LocalSignInRequestDto,
  LocalSignUpRequestDto,
  RefreshTokenRequestDto,
  ResetPasswordRequestDto,
} from './dto';
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
      new LocalSignUpCommand(dto.email, dto.password)
    );
  }

  @Public()
  @Get('sign-in/google')
  @UseGuards(GoogleOAuthGuard)
  googleSignIn() {
    return undefined;
  }

  @Public()
  @Get('sign-in/google/callback')
  @HttpCode(HttpStatus.PERMANENT_REDIRECT)
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

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(
    @CurrentUser() user: AuthorizedUser,
    @Body() dto: ResetPasswordRequestDto
  ) {
    return this.commandBus.execute(
      new ResetPasswordCommand(user.email, dto.oldPassword, dto.password)
    );
  }

  @Public()
  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body() dto: RefreshTokenRequestDto) {
    return this.commandBus.execute(new RefreshTokenCommand(dto.token));
  }
}
