import { Module } from '@nestjs/common';
import { CommonConfigModule } from '@configs/config.module';
import { AppConfigService } from '@configs/app/app.service';

@Module({
  imports: [CommonConfigModule],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
