import { Inject, Injectable } from '@nestjs/common';
import { GameHiloRepositotyInjectName } from '@providers/database/inject-name.constant';
import { GameHiloRepositoryInterface } from '@schemas/repositories';

@Injectable()
export class GameHiloService {
  constructor(
    @Inject(GameHiloRepositotyInjectName)
    private readonly _gameHiloRepository: GameHiloRepositoryInterface,
  ) {}

  startGame() {
    console.log('startGame game hilo');
  }
}
