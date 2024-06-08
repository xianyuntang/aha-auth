export class ResetPasswordCommand {
  constructor(
    public readonly email: string,
    public readonly oldPassword: string,
    public readonly password: string
  ) {}
}
