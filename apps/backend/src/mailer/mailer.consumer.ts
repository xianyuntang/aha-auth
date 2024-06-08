import { Process, Processor } from '@nestjs/bull';
import { ISendMailOptions } from '@nestjs-modules/mailer/dist/interfaces/send-mail-options.interface';
import { MailerService as _MailerService } from '@nestjs-modules/mailer/dist/mailer.service';
import { Job } from 'bull';

import { QUEUE_NAME } from './mailer.constant';

@Processor(QUEUE_NAME)
export class MailerConsumer {
  constructor(private readonly mailerService: _MailerService) {}

  /**
   * Sends an email using the mailer service.
   *
   * @param {Job<ISendMailOptions>} job - The bull job.
   * @return {Promise<void>}
   */
  @Process()
  async sendMail(job: Job<ISendMailOptions>): Promise<void> {
    return this.mailerService.sendMail(job.data);
  }
}
