import { LocalSignInHandler } from './local-sign-in.handler';
import { LocalSignUpHandler } from './local-sign-up.handler';
import { OauthSignInHandler } from './oauth-sign-in.handler';
import { ResetPasswordHandler } from './reset-password.handler';

export const commandHandlers = [
  LocalSignInHandler,
  LocalSignUpHandler,
  OauthSignInHandler,
  ResetPasswordHandler,
];
