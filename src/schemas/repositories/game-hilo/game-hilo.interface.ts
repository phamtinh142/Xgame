import { BaseRepositoryInterface } from '@providers/database/base.interface.repository';
import { GameHiloDocument } from '../../game-hilo.schema';

export interface GameHiloRepositoryInterface extends BaseRepositoryInterface<GameHiloDocument> {}
