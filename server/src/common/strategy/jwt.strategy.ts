import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AppConfigService } from '@configs/app/app.service';
import { Inject } from '@nestjs/common';
import { PayloadToken } from '@common/dto/user.dto';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AppConfigService)
    appConfigService: AppConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfigService.tokenSecretKey,
    });
  }

  async validate(payload: PayloadToken) {
    return { _id: payload.sub, username: payload.username };
  }
}
