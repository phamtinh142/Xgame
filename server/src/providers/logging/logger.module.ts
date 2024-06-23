import { Global, Module } from '@nestjs/common';
import { LoggerService } from '@providers/logging/logger.service';
import { AppConfigModule } from '@configs/app/app.module';

@Global()
@Module({
  imports: [AppConfigModule],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
