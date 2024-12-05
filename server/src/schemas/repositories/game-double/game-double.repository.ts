import { BaseRepositoryAbstract } from '@providers/database/base.abstract.repository';
import { GameDouble, GameDoubleDocument } from '../../game-double.schema';
import { GameDoubleRepositoryInterface } from '@schemas/repositories';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GameStatusEnum } from '@common/constants';

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

  getLastGameInfo(status: GameStatusEnum): Promise<GameDoubleDocument> {
    return this._gameDoubleModel.findOne({ status }).sort({ gameID: -1 }).exec();
  }

  createGame(game: GameDouble): Promise<GameDoubleDocument> {
    return this._gameDoubleModel.create(game);
  }
}
