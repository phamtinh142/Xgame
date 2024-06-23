import { Module } from '@nestjs/common';
import { ServiceModule } from '@services/index.module';
import { AuthController } from './auth.controller';
import { HomeController } from './home.controller';
import { LotteryController } from './lottery.controller';
import { UserController } from './user.controller';

@Module({
  imports: [ServiceModule],
  controllers: [AuthController, HomeController, LotteryController, UserController],
})
export class ControllerModule {}
