import { Inject, Injectable } from '@nestjs/common';
import { createRandomGameDouble } from '@common/help';
import { GameDoubleRepositotyInjectName } from '@providers/database/inject-name.constant';
import { GameDoubleRepositoryInterface } from '@schemas/repositories';

@Injectable()
export class LotteryService {
  constructor(
    @Inject(GameDoubleRepositotyInjectName)
    private readonly _gameDoubleRepository: GameDoubleRepositoryInterface,
  ) {}

  createGame() {
    const { roundNumberWin } = createRandomGameDouble();

    let colorWin: number;
    const gameID = 1000;
    const old_rotate = 9999;
    let new_rotate: number;

    if (roundNumberWin === 0) {
      colorWin = 2;
    } else if (roundNumberWin <= 7) {
      colorWin = 3;
    } else {
      colorWin = 1;
    }
  }
}
