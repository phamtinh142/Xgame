import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { BetGameStatusEnum } from '@common/constants';

export type BetGameHiloDocument = BetGameHilo & Document;

@Schema({ collection: 'bet_game_hilo', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class BetGameHilo {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'user' })
  user_id: MongooseSchema.Types.ObjectId;

  @Prop()
  game_id: number;

  @Prop({ default: 0 })
  coin_bet_hi: number;

  @Prop({ default: 0 })
  coin_bet_lo: number;

  @Prop({ default: 0 })
  coin_bet_colorRed: number;

  @Prop({ default: 0 })
  coin_bet_colorBlack: number;

  @Prop({ default: 0 })
  coin_bet_ace: number;

  @Prop({ default: 0 })
  coin_bet_kingToAce: number;

  @Prop({ default: 0 })
  coin_bet_twoToNine: number;

  @Prop({ default: 0 })
  coin_bet_jackToAce: number;

  @Prop({ default: 0 })
  coin_bet_joker: number;

  @Prop({ default: 0 })
  coin_win: number;

  @Prop()
  bet_time: Date;

  @Prop({ type: Number, enum: BetGameStatusEnum, default: BetGameStatusEnum.ONGOING })
  status: BetGameStatusEnum;
}

const BetGameHiloSchema = SchemaFactory.createForClass(BetGameHilo);

BetGameHiloSchema.index({
  created_at: 1,
  _id: 1,
  game_id: 1,
});

export { BetGameHiloSchema };
