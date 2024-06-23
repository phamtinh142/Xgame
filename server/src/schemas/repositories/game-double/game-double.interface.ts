import { BaseRepositoryInterface } from '@providers/database/base.interface.repository';
import { GameDoubleDocument } from '../../game-double.schema';

export interface GameDoubleRepositoryInterface extends BaseRepositoryInterface<GameDoubleDocument> {
  getLastGame(): Promise<GameDoubleDocument>;
}
