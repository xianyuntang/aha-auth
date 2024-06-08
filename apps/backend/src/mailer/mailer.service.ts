import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { ISendMailOptions } from '@nestjs-modules/mailer/dist/interfaces/send-mail-options.interface';
import { Queue } from 'bull';

import { QUEUE_NAME } from './mailer.constant';

@Injectable()
export class MailerService {
  constructor(@InjectQueue(QUEUE_NAME) private readonly mailerQueue: Queue) {}

  /**
   * Add a send mail request to the queue
   *
   * @param {ISendMailOptions} sendMailOptions - The options for sending the mail.
   * @return {Promise<void>}
   */
  async sendMail(sendMailOptions: ISendMailOptions): Promise<void> {
    await this.mailerQueue.add(sendMailOptions);
  }
}
