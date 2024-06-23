import { BaseRepositoryAbstract } from '@providers/database/base.abstract.repository';
import { User, UserDocument } from '../../user.schema';
import { UserRepositoryInterface } from './user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class UserRepository extends BaseRepositoryAbstract<UserDocument> implements UserRepositoryInterface {
  constructor(
    @InjectModel(User.name)
    private readonly _userModel: Model<UserDocument>,
  ) {
    super(_userModel);
  }

  async checkUserExist(userName: string, email: string): Promise<boolean> {
    const user = await this._userModel.findOne({ $or: [{ userName }, { email }] });

    return !!user;
  }
}
