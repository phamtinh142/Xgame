import { Injectable } from '@nestjs/common';
import { CommonConfigService } from '@configs/config.service';

@Injectable()
export class DatabaseConfigService {
  constructor(private readonly _commonConfigService: CommonConfigService) {}

  get databaseUri(): string {
    return this._commonConfigService.getString('DATABASE_URI', 'mongodb://localhost:27017/xgame');
  }

  get databaseName(): string {
    return this._commonConfigService.getString('DATABASE_NAME', 'xgame');
  }
}
