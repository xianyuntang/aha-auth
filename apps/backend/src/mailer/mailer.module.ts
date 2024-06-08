import { BullModule } from '@nestjs/bull';
import { DynamicModule, Global, Module } from '@nestjs/common';
import {
  MailerModule as _MailerModule,
  MailerOptions,
} from '@nestjs-modules/mailer';
import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';

import { QUEUE_NAME } from './mailer.constant';
import { MailerConsumer } from './mailer.consumer';
import { MailerService } from './mailer.service';

@Global()
@Module({})
export class MailerModule {
  static forRoot(options: MailerOptions): DynamicModule {
    return {
      module: MailerModule,
      imports: [
        _MailerModule.forRoot(options),
        BullModule.registerQueue({
          name: QUEUE_NAME,
        }),
      ],
      providers: [MailerService, MailerConsumer],
      exports: [MailerService],
    };
  }

  static forRootAsync(options: MailerAsyncOptions): DynamicModule {
    return {
      module: MailerModule,
      imports: [
        _MailerModule.forRootAsync(options),
        BullModule.registerQueue({
          name: QUEUE_NAME,
        }),
      ],
      providers: [MailerService, MailerConsumer],
      exports: [MailerService],
    };
  }
}
