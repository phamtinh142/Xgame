import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { Injectable } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { RedisConfigService } from '@configs/redis/redis.service';

@Injectable()
export class RedisAdapter extends IoAdapter {
  private _adapterConstructor: ReturnType<typeof createAdapter>;
  private _redisConfigService: RedisConfigService;

  constructor(app: NestExpressApplication, redisConfigService: RedisConfigService) {
    super(app);
    this._redisConfigService = redisConfigService;
  }

  async connectToRedis(): Promise<void> {
    const redisHost = this._redisConfigService.redisHost;
    const redisPort = this._redisConfigService.redisPort;

    const pubClient = createClient({
      url: `redis://${redisHost}:${redisPort}`,
    });
    const subClient = pubClient.duplicate();

    await Promise.all([pubClient.connect(), subClient.connect()]);

    this._adapterConstructor = createAdapter(pubClient, subClient);
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    server.adapter(this._adapterConstructor);
    return server;
  }
}
