import { BaseRepositoryAbstract } from '@providers/database/base.abstract.repository';
import { BetGameHilo, BetGameHiloDocument } from '../../bet-game-hilo.schema';
import { BetGameHiloRepositoryInterface } from '@schemas/repositories';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class BetGameHiloRepository
  extends BaseRepositoryAbstract<BetGameHiloDocument>
  implements BetGameHiloRepositoryInterface
{
  constructor(
    @InjectModel(BetGameHilo.name)
    private readonly _betGameHiloModel: Model<BetGameHiloDocument>,
  ) {
    super(_betGameHiloModel);
  }
}
