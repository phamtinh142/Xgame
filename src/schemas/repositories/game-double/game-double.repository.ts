import { BaseRepositoryAbstract } from '@providers/database/base.abstract.repository';
import { GameDouble, GameDoubleDocument } from '../../game-double.schema';
import { GameDoubleRepositoryInterface } from '@schemas/repositories';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class GameDoubleRepository
  extends BaseRepositoryAbstract<GameDoubleDocument>
  implements GameDoubleRepositoryInterface
{
  constructor(
    @InjectModel(GameDouble.name)
    private readonly _gameDoubleModel: Model<GameDoubleDocument>,
  ) {
    super(_gameDoubleModel);
  }

  getLastGame(): Promise<GameDoubleDocument> {
    return this._gameDoubleModel.findOne().sort({ createdAt: -1 }).exec();
  }
}
