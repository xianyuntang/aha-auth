export class LocalSignUpCommand {
  constructor(
    public readonly email: string,
    public readonly password: string
  ) {}
}
