import { BaseRepositoryInterface } from '@providers/database/base.interface.repository';
import { GameDouble, GameDoubleDocument } from '../../game-double.schema';
import { GameStatusEnum } from '@common/constants';

export interface GameDoubleRepositoryInterface extends BaseRepositoryInterface<GameDoubleDocument> {
  getLastGameInfo(status: GameStatusEnum): Promise<GameDoubleDocument>;

  createGame(game: GameDouble): Promise<GameDoubleDocument>;
}
