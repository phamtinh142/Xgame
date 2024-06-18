import { Injectable } from '@nestjs/common';
import { CommonConfigService } from '@configs/config.service';

@Injectable()
export class RedisConfigService {
  constructor(private readonly _commonConfigService: CommonConfigService) {}

  get redisHost(): string {
    return this._commonConfigService.getString('REDIS_HOST', 'localhost');
  }

  get redisPort(): number {
    return this._commonConfigService.getNumber('REDIS_PORT', 6379);
  }
}
