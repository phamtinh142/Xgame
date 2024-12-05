import { BaseRepositoryAbstract } from '@providers/database/base.abstract.repository';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BetGameDouble, BetGameDoubleDocument } from '../../bet-game-double.schema';
import { BetGameDoubleRepositoryInterface } from '@schemas/repositories';

export class BetGameDoubleRepository
  extends BaseRepositoryAbstract<BetGameDoubleDocument>
  implements BetGameDoubleRepositoryInterface
{
  constructor(
    @InjectModel(BetGameDouble.name)
    private readonly _betGameDoubleModel: Model<BetGameDoubleDocument>,
  ) {
    super(_betGameDoubleModel);
  }

  async getAllUserBetGame(gameID: number): Promise<BetGameDoubleDocument[]> {
    return this._betGameDoubleModel.aggregate([
      {
        $match: { game_id: gameID },
      },
    ]);
  }
}
