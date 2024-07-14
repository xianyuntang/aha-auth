import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthorizedUser, JwtTokenPayload } from 'common';
import dayjs from 'dayjs';
import urljoin from 'url-join';

import { AppConfigService } from '../../app-config';
import { User } from '../../orm';

@Injectable()
export class JwtTokenService {
  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly jwtService: JwtService
  ) {}

  /**
   * Generates a sign-in link for the given user.
   */
  async getSignInLink(user: User): Promise<string> {
    const {
      server: { externalUrl },
    } = this.appConfigService;
    const accessToken = this.issueAccessToken(user);
    const refreshToken = this.issueRefreshToken(user);

    return urljoin(
      externalUrl,
      'sign-in',
      `?accessToken=${accessToken}`,
      `?refreshToken=${refreshToken}`
    );
  }

  /**
   * Generates a verify link for the given user.
   */
  async getVerifyEmailLink(user: User): Promise<string> {
    const {
      server: { externalApiUrl, prefix },
    } = this.appConfigService;
    const accessToken = this.issueAccessToken(user);

    return urljoin(
      externalApiUrl,
      prefix,
      'auth',
      'verify-email',
      `?accessToken=${accessToken}`
    );
  }

  /**
   * Decodes the refresh token
   */
  async decodeRefreshToken(
    token: string
  ): Promise<JwtTokenPayload | undefined> {
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

  /**
   * Generates an access token for the given user.
   */
  issueAccessToken(user: User): string {
    const {
      jwt: { accessSecret, accessTokenExpiresIn },
    } = this.appConfigService;
    const {
      id,
      email,
      password,
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
          oauth: !password,
        } as AuthorizedUser,
      },
      {
        secret: accessSecret,
        expiresIn: accessTokenExpiresIn,
        subject: id,
      }
    );
  }

  /**
   * Generates a refresh token for the given user.
   */
  issueRefreshToken(user: User): string {
    const {
      jwt: { refreshSecret, refreshTokenExpiresIn },
    } = this.appConfigService;
    const {
      id,
      email,
      password,
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
          oauth: !password,
        } as AuthorizedUser,
      },
      {
        secret: refreshSecret,
        expiresIn: refreshTokenExpiresIn,
        subject: id,
      }
    );
  }
  /**
   * Determines if the given token has already expired.
   */
  isTokenExpired(exp: number): boolean {
    return exp < dayjs().unix();
  }

  /**
   * Decodes the access token
   */
  async decodeAccessToken(token: string): Promise<JwtTokenPayload | undefined> {
    let decodedToken: JwtTokenPayload | null = null;
    try {
      decodedToken = (await this.jwtService.verify(token, {
        secret: this.appConfigService.jwt.accessSecret,
      })) as JwtTokenPayload;
      return decodedToken;
    } catch (e) {
      return undefined;
    }
  }
}
