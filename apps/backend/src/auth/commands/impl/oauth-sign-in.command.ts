import { Profile } from 'passport-google-oauth20';

export class OauthSignInCommand {
  constructor(public readonly profile: Profile) {}
}
