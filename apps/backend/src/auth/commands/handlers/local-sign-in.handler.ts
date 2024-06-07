import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { LocalSignInCommand } from '../impl';

@CommandHandler(LocalSignInCommand)
export class LocalSignInHandler implements ICommandHandler<LocalSignInCommand> {
  async execute() {
    return undefined;
  }
}
