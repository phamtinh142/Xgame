import { Inject, Injectable } from '@nestjs/common';
import { GameDoubleRepositotyInjectName } from '@providers/database/inject-name.constant';
import { GameDoubleRepositoryInterface } from '@schemas/repositories';
import { ColorGameDoubleEnum, GameStatusEnum } from '@common/constants';
import { Subject } from 'rxjs';
import { createNewRotateGameDouble, createRandomGameDouble } from '@common/help/game-double.help';

const COUNT_DOWN = 25;

@Injectable()
export class GameDoubleService {
  private newGameDouble = new Subject<{ name: string; data: unknown }>();
  onNewGameDouble = this.newGameDouble.asObservable();

  constructor(
    @Inject(GameDoubleRepositotyInjectName)
    private readonly _gameDoubleRepository: GameDoubleRepositoryInterface,
  ) {}

  async startGame() {
    console.log('startGame lottery');

    const lastGameBetting = await this._gameDoubleRepository.getLastGameInfo(GameStatusEnum.BETTING);

    if (lastGameBetting) {
      await this.createGame();
      return;
    }
  }

  async createGame() {
    const { roundNumberWin, roundNumber, hashSalt, roundHash } = createRandomGameDouble();

    console.log('roundNumberWin: ', roundNumberWin);

    let colorWin: number;
    let gameID = 1000;
    let old_rotate = 9999;

    if (roundNumberWin === 0) {
      colorWin = ColorGameDoubleEnum.GREEN;
    } else if (roundNumberWin <= 7) {
      colorWin = ColorGameDoubleEnum.BLACK;
    } else {
      colorWin = ColorGameDoubleEnum.RED;
    }

    const lastGameDone = await this._gameDoubleRepository.getLastGameInfo(GameStatusEnum.DONE);

    if (lastGameDone) {
      gameID = lastGameDone.game_id + 1;
      old_rotate = lastGameDone.rotate;
    }

    let randomRotate = roundNumber * 10;

    if (roundNumber > 0.5) {
      randomRotate = 360 - randomRotate;
    }

    const new_rotate = createNewRotateGameDouble(roundNumberWin, randomRotate);

    const newGame = await this._gameDoubleRepository.createGame({
      game_id: gameID,
      round_number: roundNumber,
      round_number_win: roundNumberWin,
      color_win: colorWin,
      hash_salt: hashSalt,
      round_hash: roundHash,
      rotate: parseFloat(new_rotate.toFixed(2)),
      status: GameStatusEnum.BETTING,
      timestamp: Date.now() * (COUNT_DOWN * 1000),
      coin: 0,
      coin_profit: 0,
    });

    this.newGameDouble.next({ name: 'new_game_double', data: {} });
  }
}
