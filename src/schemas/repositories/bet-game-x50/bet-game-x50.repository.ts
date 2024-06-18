import { BaseRepositoryAbstract } from '@providers/database/base.abstract.repository';
import { BetGameX50Document } from '../../bet-game-x50.schema';
import { BetGameX50RepositoryInterface } from '@schemas/repositories';
import { InjectModel } from '@nestjs/mongoose';
import { BetGameHilo } from '../../bet-game-hilo.schema';
import { Model } from 'mongoose';

export class BetGameX50Repository
  extends BaseRepositoryAbstract<BetGameX50Document>
  implements BetGameX50RepositoryInterface
{
  constructor(
    @InjectModel(BetGameHilo.name)
    private readonly _betGameX50Model: Model<BetGameX50Document>,
  ) {
    super(_betGameX50Model);
  }
}
