import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthorizedUser, JwtTokenPayload } from 'common';
import urljoin from 'url-join';

import { AppConfigService } from '../../app-config';
import { User } from '../../orm';

@Injectable()
export class JwtTokenService {
  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly jwtService: JwtService
  ) {}

  async getSignInLink(user: User) {
    const {
      server: { externalUrl, prefix },
    } = this.appConfigService;
    const accessToken = this.issueAccessToken(user);
    const refreshToken = this.issueRefreshToken(user);

    return urljoin(
      externalUrl,
      prefix,
      'sign-in',
      `?accessToken=${accessToken}`,
      `?refreshToken=${refreshToken}`
    );
  }

  async decodeAccessToken(token: string) {
    let decodedTokenPayload: JwtTokenPayload | null = null;
    try {
      decodedTokenPayload = (await this.jwtService.verify(token, {
        secret: this.appConfigService.jwt.accessSecret,
      })) as JwtTokenPayload;
      return decodedTokenPayload;
    } catch (e) {
      return undefined;
    }
  }

  async decodeRefreshToken(token: string) {
    let decodedToken: JwtTokenPayload | null = null;
    try {
      decodedToken = (await this.jwtService.verify(token, {
        secret: this.appConfigService.jwt.refreshSecret,
      })) as JwtTokenPayload;
      return decodedToken;
    } catch (e) {
      return undefined;
    }
  }

  issueAccessToken(user: User) {
    const {
      jwt: { accessSecret, accessTokenExpiresIn },
    } = this.appConfigService;
    const {
      id,
      email,
      profile: { firstName, lastName },
    } = user;

    return this.jwtService.sign(
      {
        user: {
          id,
          email,
          profile: {
            firstName: firstName ?? null,
            lastName: lastName ?? null,
          },
        } as AuthorizedUser,
      },
      {
        secret: accessSecret,
        expiresIn: accessTokenExpiresIn,
        subject: id,
      }
    );
  }

  issueRefreshToken(user: User) {
    const {
      jwt: { refreshSecret, refreshTokenExpiresIn },
    } = this.appConfigService;
    const {
      id,
      email,
      profile: { firstName, lastName },
    } = user;

    return this.jwtService.sign(
      {
        user: {
          id,
          email,
          profile: {
            firstName: firstName ?? null,
            lastName: lastName ?? null,
          },
        } as AuthorizedUser,
      },
      {
        secret: refreshSecret,
        expiresIn: refreshTokenExpiresIn,
        subject: id,
      }
    );
  }
}
