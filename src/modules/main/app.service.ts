import { Injectable,Logger } from '@nestjs/common';
import { ConfigService } from './../config';
import { Cron, Interval, Timeout  } from '@nestjs/schedule';

@Injectable()
export class AppService {
  constructor(private config: ConfigService) {}

  private readonly logger = new Logger(AppService.name);

  // @Cron('20 * * * * *')
  // handleCron() {
  //   this.logger.debug('Called when the second is 20');
  // }

  // @Cron('45 * * * * *')
  // handleCron2() {
  //   this.logger.debug('Called when the current second is 45');
  // }

  // @Interval(10000)
  // handleInterval() {
  //   this.logger.debug('Called every 10 seconds');
  // }

  // @Timeout(5000)
  // handleTimeout() {
  //   this.logger.debug('Called once after 5 seconds');
  // }

  root(): string {
    return this.config.get('APP_URL');
  }
}
