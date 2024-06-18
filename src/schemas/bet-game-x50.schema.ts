import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { BetGameStatusEnum } from '@common/constants';

export type BetGameX50Document = BetGameX50 & Document;

@Schema({ collection: 'bet_game_x50', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class BetGameX50 {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'user' })
  user_id: MongooseSchema.Types.ObjectId;

  @Prop()
  game_id: number;

  @Prop({ default: 0 })
  coin_bet_blue: number;

  @Prop({ default: 0 })
  coin_bet_red: number;

  @Prop({ default: 0 })
  coin_bet_green: number;

  @Prop({ default: 0 })
  coin_bet_yellow: number;

  @Prop({ default: 0 })
  coin_win: number;

  @Prop()
  bet_time: Date;

  @Prop({ type: Number, enum: BetGameStatusEnum, default: BetGameStatusEnum.ONGOING })
  status: BetGameStatusEnum;
}

const BetGameX50Schema = SchemaFactory.createForClass(BetGameX50)

BetGameX50Schema.index({
  created_at: 1,
  _id: 1,
  game_id: 1,
});

export { BetGameX50Schema };
