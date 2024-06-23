import { Controller, Get } from '@nestjs/common';

@Controller('lottery')
export class LotteryController {
  @Get('/')
  getLottery() {
    return { isLottery: true };
  }
}
