import { Module } from '@nestjs/common';
import { DatabaseModule } from '@providers/database/database.module';
import { AuthService } from './auth.service';
import { HomeService } from './home.service';
import { LotteryService } from './lottery.service';
import { UserService } from './user.service';
import { LocalStrategy } from '@common/strategy/local.strategy';
import { JwtStrategy } from '@common/strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { AppConfigService } from '@configs/app/app.service';
import { AppConfigModule } from '@configs/app/app.module';

const services = [AuthService, HomeService, LotteryService, UserService, LocalStrategy, JwtStrategy] as any[];

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    AppConfigModule,
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (config: AppConfigService) =>
        ({
          secret: config.tokenSecretKey,
          signOptions: { expiresIn: config.tokenExpires, algorithm: 'HS256' },
        } as JwtModuleOptions),
    }),
  ],
  providers: [...services],
  exports: [...services],
})
export class ServiceModule {}
