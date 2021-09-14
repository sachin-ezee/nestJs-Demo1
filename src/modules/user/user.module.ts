import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './user.service';
import { LoginLog } from './login_log.entity';
import { LoginLogService } from './login_log.service';
import { UserTeams } from './user_team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]),TypeOrmModule.forFeature([LoginLog]),TypeOrmModule.forFeature([UserTeams])],
  exports: [UsersService, LoginLogService],
  providers: [UsersService, LoginLogService],
})
export class UserModule {}
