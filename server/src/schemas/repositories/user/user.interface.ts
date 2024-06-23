import { BaseRepositoryInterface } from '@providers/database/base.interface.repository';
import { UserDocument } from '../../user.schema';

export interface UserRepositoryInterface extends BaseRepositoryInterface<UserDocument> {
  checkUserExist(userName: string, email: string): Promise<boolean>;
}
