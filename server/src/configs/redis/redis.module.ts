import { Module } from '@nestjs/common';
import { CommonConfigModule } from '@configs/config.module';
import { RedisConfigService } from '@configs/redis/redis.service';

@Module({
  imports: [CommonConfigModule],
  providers: [RedisConfigService],
  exports: [RedisConfigService],
})
export class RedisConfigModule {}
