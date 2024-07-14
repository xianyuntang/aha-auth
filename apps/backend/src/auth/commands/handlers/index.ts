import { LocalSignInHandler } from './local-sign-in.handler';
import { LocalSignUpHandler } from './local-sign-up.handler';
import { OauthSignInHandler } from './oauth-sign-in.handler';
import { RefreshTokenHandler } from './refresh-token.handler';
import { ResetPasswordHandler } from './reset-password.handler';
import { VerifyEmailHandler } from './verify-email.handler';

export const commandHandlers = [
  LocalSignInHandler,
  LocalSignUpHandler,
  OauthSignInHandler,
  RefreshTokenHandler,
  ResetPasswordHandler,
  VerifyEmailHandler,
];
