import { Module } from '@nestjs/common';
import { GameX2Socket } from '@socket/game-x2.socket';

@Module({
  providers: [GameX2Socket],
})
export class SocketModule {}
