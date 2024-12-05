import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { DatabaseModule } from '@providers/database/database.module';
import { AuthService } from './auth.service';
import { HomeService } from './home.service';
import { GameDoubleService } from './game-double.service';
import { UserService } from './user.service';
import { LocalStrategy } from '@common/strategy/local.strategy';
import { JwtStrategy } from '@common/strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { AppConfigService } from '@configs/app/app.service';
import { AppConfigModule } from '@configs/app/app.module';
import { GameX50Service } from '@services/game-x50.service';
import { GameHiloService } from '@services/game-hilo.service';

const services = [
  AuthService,
  HomeService,
  GameDoubleService,
  GameX50Service,
  GameHiloService,
  UserService,
  LocalStrategy,
  JwtStrategy,
] as any[];

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
export class ServiceModule implements OnApplicationBootstrap {
  constructor(
    private readonly _gameDoubleService: GameDoubleService,
    private readonly _gameX50Service: GameX50Service,
    private readonly _gameHiloService: GameHiloService,
  ) {}

  async onApplicationBootstrap() {
    this._gameDoubleService.startGame().then();
    this._gameX50Service.startGame();
    this._gameHiloService.startGame();
  }
}
