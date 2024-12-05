import { Inject, Injectable } from '@nestjs/common';
import { GameX50RepositotyInjectName } from '@providers/database/inject-name.constant';
import { GameX50RepositoryInterface } from '@schemas/repositories';

@Injectable()
export class GameX50Service {
  constructor(
    @Inject(GameX50RepositotyInjectName)
    private readonly _gameX50Repository: GameX50RepositoryInterface,
  ) {}

  startGame() {
    console.log('startGame game x50');
  }
}
