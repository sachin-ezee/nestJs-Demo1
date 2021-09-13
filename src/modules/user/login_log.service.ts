import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';

import { LoginLog } from './login_log.entity';

@Injectable()
export class LoginLogService {
  constructor(
    @InjectRepository(LoginLog)
    private readonly loginRepository: Repository<LoginLog>,
  ) {}

  async addLoginLog(user_id: number) {
 
  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(LoginLog)
    .values({ user_id: user_id, login_time: new Date().getTime() },)
    .execute();
    }
}
