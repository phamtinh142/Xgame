import { Module } from '@nestjs/common';
import { DatabaseModule } from '@providers/database/database.module';
import { AuthService } from './auth.service';
import { HomeService } from './home.service';
import { LotteryService } from './lottery.service';
import { UserService } from './user.service';
import { LocalStrategy } from '@common/strategy/local.strategy';

const services = [AuthService, HomeService, LotteryService, UserService, LocalStrategy] as any[];

@Module({
  imports: [DatabaseModule],
  providers: [...services],
  exports: [...services],
})
export class ServiceModule {}
