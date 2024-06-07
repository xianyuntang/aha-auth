export class LocalSignUpCommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly confirmPassword: string
  ) {}
}
