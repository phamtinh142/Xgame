import { IsEmail, IsNotEmpty, IsString, Validate } from 'class-validator';
import { Match } from '@common/validations/match.validation';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SigninDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @Validate(Match, ['password'])
  confirmPassword: string;
}
