import { Inject, Injectable } from '@nestjs/common';
import { GameDoubleRepositotyInjectName } from '@providers/database/inject-name.constant';
import { GameDoubleRepositoryInterface } from '@schemas/repositories';
import { GameStatusEnum } from '@common/constants';
import { Subject } from 'rxjs';
import { createColorWinGameDouble, createNewRotateGameDouble, createRandomGameDouble } from '@common/help';

const COUNT_DOWN = 25;

@Injectable()
export class GameDoubleService {
  private gameDoubleSubject = new Subject<{ name: string; data: unknown }>();
  onGameDoubleSubject = this.gameDoubleSubject.asObservable();

  constructor(
    @Inject(GameDoubleRepositotyInjectName)
    private readonly _gameDoubleRepository: GameDoubleRepositoryInterface,
  ) {}

  async startGame() {
    const lastGameBetting = await this._gameDoubleRepository.getLastGameInfo(GameStatusEnum.BETTING);

    if (lastGameBetting) {
      await this.createGame();
      return;
    }
  }

  async createGame() {
    const { roundNumberWin, roundNumber, hashSalt, roundHash } = createRandomGameDouble();
    const lastGameDone = await this._gameDoubleRepository.getLastGameInfo(GameStatusEnum.DONE);
    const gameID = lastGameDone ? lastGameDone.game_id + 1 : 1000;
    const oldRotate = lastGameDone ? lastGameDone.rotate : 9999;

    let randomRotate = roundNumber * 10;

    if (roundNumber > 0.5) {
      randomRotate = 360 - randomRotate;
    }

    const newRotate = createNewRotateGameDouble(roundNumberWin, randomRotate);
    const colorWin = createColorWinGameDouble(roundNumberWin);

    const newGame = await this._gameDoubleRepository.createGame({
      game_id: gameID,
      round_number: roundNumber,
      round_number_win: roundNumberWin,
      color_win: colorWin,
      hash_salt: hashSalt,
      round_hash: roundHash,
      rotate: parseFloat(newRotate.toFixed(2)),
      status: GameStatusEnum.BETTING,
      timestamp: Date.now() * (COUNT_DOWN * 1000),
      coin: 0,
      coin_profit: 0,
    });

    this.gameDoubleSubject.next({
      name: 'returnNewGame',
      data: {
        _id: newGame._id,
        gameID: newGame.game_id,
        roundHash: roundHash,
        oldRotate: oldRotate,
        remain_time: COUNT_DOWN,
      },
    });
  }
}
