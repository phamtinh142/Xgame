import { Document } from 'mongoose';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { ColorGameDoubleEnum, GameStatusEnum } from '@common/constants';

export type GameDoubleDocument = GameDouble & Document;

@Schema({ collection: 'game_double', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class GameDouble {
  @Prop({ unique: true })
  game_id: number;

  @Prop()
  round_number: number;

  @Prop()
  round_number_win: number;

  @Prop({ type: Number, enum: ColorGameDoubleEnum })
  color_win: number;

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

  @Prop({ default: 0 })
  coin: number;

  @Prop({ default: 0 })
  golden_coin_profit: number;

  @Prop({ default: 0 })
  diamond_coin_profit: number;
}

const GameDoubleSchema = SchemaFactory.createForClass(GameDouble);

GameDoubleSchema.index({
  created_at: 1,
  _id: 1,
  game_id: 1,
});

export { GameDoubleSchema };
