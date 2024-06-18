import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommonConfigService } from './config.service';
import { join } from 'path';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), '.env'),
    }),
  ],
  providers: [ConfigService, CommonConfigService],
  exports: [ConfigService, CommonConfigService],
})
export class CommonConfigModule {}
