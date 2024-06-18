import { Controller, Get, Render } from '@nestjs/common';

@Controller('lottery')
export class LotteryController {
  @Get('/')
  @Render('lottery/lottery')
  getLottery() {
    return { isLottery: true };
  }
}
