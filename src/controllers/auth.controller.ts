import { Controller, Post, Res, Req, Body, UseGuards, HttpStatus, Get } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { BaseResponse } from '@common/dto/base.response';
import { AuthService } from '@services/auth.service';
import { SigninDto } from '@dto/auth.dto';

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

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: Request) {
    req.session['user'] = req.user;
    return new BaseResponse({
      statusCode: HttpStatus.OK,
      status: true,
      message: 'Login successfully',
      data: {
        redirect: '/',
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
}
