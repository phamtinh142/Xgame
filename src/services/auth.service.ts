import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserRepositotyInjectName } from '@providers/database/inject-name.constant';
import { compare, genSalt, hash } from 'bcrypt';
import { UserInfo } from '@common/dto/user.dto';
import { UserRepository } from '@schemas/repositories';
import { LoginDto, SigninDto } from '@dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserRepositotyInjectName)
    private readonly _userRepository: UserRepository,
  ) {}

  async validateUser(data: LoginDto): Promise<UserInfo> {
    const user = await this._userRepository.findOne({ email: data.email });

    if (user) {
      const checkPassword = await this.comparePasswords(data.password, user.password);

      if (!checkPassword) {
        return null;
      }

      return {
        _id: user._id,
        email: user.email,
        userName: user.username,
        status: user.status,
        permission: user.permission,
        avatar: user.avatar,
        coin: user.coin,
        level: user.level,
      } as UserInfo;
    }

    return null;
  }

  async createUser(data: SigninDto): Promise<any> {
    const userFound = await this._userRepository.checkUserExist(data.username, data.email);

    if (userFound) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Username or email already exist',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await this.hashPassword(data.password);

    return await this._userRepository.create({
      userName: data.username,
      email: data.email,
      password: hashPassword,
    });
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await genSalt();
    return await hash(password, salt);
  }

  async comparePasswords(password: string, storedPassword: string): Promise<boolean> {
    return compare(password, storedPassword);
  }
}
