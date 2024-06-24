import { Controller, Post, Res, Req, Body, UseGuards, HttpStatus, Get } from '@nestjs/common';
import { Response, Request } from 'express';
import { BaseResponse } from '@common/dto/base.response';
import { AuthService } from '@services/auth.service';
import { SigninDto } from '@dto/auth.dto';
import { UserInfo } from '@common/dto/user.dto';
import { LocalAuthGuard } from '@common/guards/local.guard';
import { JwtAuthGuard } from '@common/guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('signup')
  async signup(@Body() data: SigninDto) {
    await this._authService.createUser(data);

    return new BaseResponse({
      statusCode: HttpStatus.OK,
      status: true,
      message: 'Signin successfully',
    });
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    const token = await this._authService.login(req.user as UserInfo);

    return new BaseResponse({
      statusCode: HttpStatus.OK,
      status: true,
      message: 'Login successfully',
      data: {
        access_token: token,
      },
    });
  }

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.logout(() => {
      req.session.destroy(() => {
        res.clearCookie('connect.sid');
        return res.redirect('/');
      });
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  test() {
    return new BaseResponse({
      statusCode: HttpStatus.OK,
      status: true,
      message: 'Ok',
    });
  }
}
