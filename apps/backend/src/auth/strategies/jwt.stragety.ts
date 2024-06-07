import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtTokenPayload } from 'common';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AppConfigService } from '../../app-config';

export const JWT_STRATEGY = 'JWT_STRATEGY';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT_STRATEGY) {
  constructor(readonly appConfigService: AppConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: appConfigService.jwt.accessSecret,
    });
  }

  async validate(payload: JwtTokenPayload) {
    const { user } = payload;
    return user;
  }
}
