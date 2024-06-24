import { Injectable } from '@nestjs/common';
import { CommonConfigService } from '@configs/config.service';

@Injectable()
export class AppConfigService {
  constructor(private readonly _commonConfigService: CommonConfigService) {}

  get port(): number {
    return this._commonConfigService.getNumber('PORT', 3020);
  }

  get logLevel(): string {
    return this._commonConfigService.getString('LOG_LEVEL', 'info');
  }

  get baseUrl(): string {
    return this._commonConfigService.getString('BASE_URL', 'http://localhost:3020');
  }

  get tokenSecretKey(): string {
    return this._commonConfigService.getString('TOKEN_SECRET_KEY', '5sy08TyJCn');
  }

  get tokenExpires(): string {
    return this._commonConfigService.getString('TOKEN_EXPIRES', '10h');
  }
}
