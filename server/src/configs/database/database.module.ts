import { Module } from '@nestjs/common';
import { CommonConfigModule } from '@configs/config.module';
import { DatabaseConfigService } from '@configs/database/database.service';

@Module({
  imports: [CommonConfigModule],
  providers: [DatabaseConfigService],
  exports: [DatabaseConfigService],
})
export class DatabaseConfigModule {}
