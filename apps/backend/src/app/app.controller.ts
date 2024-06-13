import { Controller, Get } from '@nestjs/common';

import { Public } from '../auth';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('/ping')
  ping() {
    return this.appService.ping();
  }
}
