import { TokenType } from '@common/types/user.type';
import { PickType } from '@nestjs/swagger';

export class UserDto {
  _id: string;
  email: string;
  username: string;
  password: string;
  status: number;
  tokens: TokenType[];
  permission: number;
  avatar: string;
  coin: number;
  level: number;
  confirmAge18: boolean;
}

export class UserInfo extends PickType(UserDto, [
  '_id',
  'email',
  'username',
  'status',
  'permission',
  'avatar',
  'coin',
  'level',
] as const) {}

export class PayloadToken {
  username: string;
  sub: string;
  iat?: number;
  exp?: number;
}
