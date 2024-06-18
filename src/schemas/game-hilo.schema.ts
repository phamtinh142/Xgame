import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { GameStatusEnum } from '@common/constants';
import { InfoCardType } from '@common/types/game.type';

export type GameHiloDocument = GameHilo & Document;

@Schema({ collection: 'game_hilo', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class GameHilo {
  @Prop({ unique: true })
  game_id: number;

  @Prop()
  round_number: number;

  @Prop()
  hash_salt: string;

  @Prop()
  round_hash: string;

  @Prop({ type: Object })
  info_card: InfoCardType;

  @Prop({ enum: GameStatusEnum, default: GameStatusEnum.BETTING })
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

const GameHiloSchema = SchemaFactory.createForClass(GameHilo);

GameHiloSchema.index({
  created_at: 1,
  _id: 1,
  game_id: 1,
});

export { GameHiloSchema };
