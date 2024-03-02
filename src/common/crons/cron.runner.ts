import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { LessThan, MoreThan } from 'typeorm';

import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  @Cron(CronExpression.EVERY_2_HOURS)
  public async handleCron() {
    const threeHoursAgo = new Date();
    threeHoursAgo.setHours(threeHoursAgo.getHours() - 12);

    const tokens = await this.refreshTokenRepository.delete({
      created: MoreThan(threeHoursAgo),
    });
    this.logger.log(tokens, tokens);
  }
}
