import { Global, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { LoggerModule } from '@providers/logging/logger.module';
import { AppService } from './app.service';
import { SocketModule } from '@providers/socket/socket.module';
import { DatabaseModule } from '@providers/database/database.module';
import { AppConfigModule } from '@configs/app/app.module';
import { RedisConfigModule } from '@configs/redis/redis.module';
import * as csurf from 'csurf';
import { ControllerModule } from './controllers/index.module';

@Global()
@Module({
  imports: [AppConfigModule, RedisConfigModule, LoggerModule, SocketModule, DatabaseModule, ControllerModule],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(csurf({ cookie: true }))
      .forRoutes(
        { path: 'auth/signup', method: RequestMethod.POST },
        { path: 'auth/login', method: RequestMethod.POST },
      );
  }
}
