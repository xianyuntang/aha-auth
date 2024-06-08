import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GOOGLE_OAUTH_STRATEGY } from '../strategies';

@Injectable()
export class GoogleOAuthGuard extends AuthGuard(GOOGLE_OAUTH_STRATEGY) {}
