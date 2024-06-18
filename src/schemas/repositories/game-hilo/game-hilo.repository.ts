import { BaseRepositoryAbstract } from '@providers/database/base.abstract.repository';
import { GameHilo, GameHiloDocument } from '../../game-hilo.schema';
import { GameHiloRepositoryInterface } from './game-hilo.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class GameHiloRepository
  extends BaseRepositoryAbstract<GameHiloDocument>
  implements GameHiloRepositoryInterface
{
  constructor(
    @InjectModel(GameHilo.name)
    private readonly _gameHiloModel: Model<GameHiloDocument>,
  ) {
    super(_gameHiloModel);
  }
}
