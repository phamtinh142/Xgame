import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { BetGameStatusEnum, ColorGameDoubleEnum } from '@common/constants';

export type BetGameDoubleDocument = BetGameDouble & Document;

@Schema({ collection: 'bet_game_double', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class BetGameDouble {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'user' })
  user_id: MongooseSchema.Types.ObjectId;

  @Prop()
  game_id: number;

  @Prop({ type: Number, enum: ColorGameDoubleEnum })
  color_bet: ColorGameDoubleEnum;

  @Prop({ default: 0 })
  coin_bet: number;

  @Prop({ default: 0 })
  coin_win: number;

  @Prop({ type: Date })
  bet_time: Date;

  @Prop({ type: Number, enum: BetGameStatusEnum, default: BetGameStatusEnum.ONGOING })
  status: BetGameStatusEnum;
}

const BetGameDoubleSchema = SchemaFactory.createForClass(BetGameDouble);

BetGameDoubleSchema.index({
  created_at: 1,
  _id: 1,
  game_id: 1,
});

export { BetGameDoubleSchema };
