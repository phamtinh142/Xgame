import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ColorGameX50Enum, GameStatusEnum } from '@common/constants';

export type GameX50Document = GameX50 & Document;

@Schema({ collection: 'game_x50', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class GameX50 {
  @Prop({ unique: true })
  gameID: number;

  @Prop()
  round_number: number;

  @Prop()
  round_number_win: number;

  @Prop({ type: Number, enum: ColorGameX50Enum })
  color_win: ColorGameX50Enum;

  @Prop()
  hash_salt: string;

  @Prop()
  round_hash: string;

  @Prop()
  rotate: number;

  @Prop({ type: Number, enum: GameStatusEnum, default: GameStatusEnum.BETTING })
  status: GameStatusEnum;

  @Prop()
  timestamp: number;

  @Prop()
  coin: number;

  @Prop({ default: 0 })
  golden_coin_profit: number;

  @Prop({ default: 0 })
  diamond_coin_profit: number;
}

const GameX50Schema = SchemaFactory.createForClass(GameX50);

GameX50Schema.index({
  created_at: 1,
  _id: 1,
  gameID: 1,
});

export { GameX50Schema };
