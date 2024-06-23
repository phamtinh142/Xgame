import { Document, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DefaultAvatar, UserPermissionEnum, UserStatusEnum } from '@common/constants/user.enum';
import { TokenType } from '@common/types/user.type';

export type UserDocument = User & Document;

@Schema({ collection: 'user', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class User {
  @Prop({ unique: true })
  email: string;

  @Prop({ unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: Number, default: UserStatusEnum.ACTIVE, enum: UserStatusEnum })
  status: UserStatusEnum;

  @Prop({ type: MongooseSchema.Types.Array })
  tokens: TokenType[];

  @Prop({ type: Number, default: UserPermissionEnum.USER, enum: UserPermissionEnum })
  permission: UserPermissionEnum;

  @Prop({ default: DefaultAvatar })
  avatar: string;

  @Prop({ default: 0 })
  coin: number;

  @Prop({ default: 1 })
  level: number;

  @Prop({ default: false })
  confirm_age_18: boolean;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({
  created_at: 1,
  _id: 1,
  email: 1,
  userName: 1,
});

export { UserSchema };
