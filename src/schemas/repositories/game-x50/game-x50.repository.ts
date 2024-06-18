import { BaseRepositoryAbstract } from '@providers/database/base.abstract.repository';
import { GameX50, GameX50Document } from '../../game-x50.schema';
import { GameX50RepositoryInterface } from './game-x50.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class GameX50Repository extends BaseRepositoryAbstract<GameX50Document> implements GameX50RepositoryInterface {
  constructor(
    @InjectModel(GameX50.name)
    private readonly _gameX50Model: Model<GameX50Document>,
  ) {
    super(_gameX50Model);
  }
}
