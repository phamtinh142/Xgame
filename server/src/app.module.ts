import { Global, Module } from '@nestjs/common';
import { LoggerModule } from '@providers/logging/logger.module';
import { AppService } from './app.service';
import { DatabaseModule } from '@providers/database/database.module';
import { AppConfigModule } from '@configs/app/app.module';
import { RedisConfigModule } from '@configs/redis/redis.module';
import { ControllerModule } from '@controllers/index.module';
import { SocketModule } from '@socket/socket.module';

@Global()
@Module({
  imports: [AppConfigModule, RedisConfigModule, LoggerModule, SocketModule, DatabaseModule, ControllerModule],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
