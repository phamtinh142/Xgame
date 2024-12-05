import { Module } from '@nestjs/common';
import { GameDoubleSocket } from '@socket/game-double.socket';
import { GameDoubleService } from '@services/game-double.service';
import { DatabaseModule } from '@providers/database/database.module';
import { GameX50Socket } from '@socket/game-x50.socket';
import { GameHiloSocket } from '@socket/game-hilo.socket';

@Module({
  imports: [DatabaseModule],
  providers: [GameDoubleSocket, GameX50Socket, GameHiloSocket, GameDoubleService],
})
export class SocketModule {}
