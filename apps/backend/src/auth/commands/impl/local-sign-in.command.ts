export class LocalSignInCommand {
  constructor(
    public readonly email: string,
    public readonly password: string
  ) {}
}
