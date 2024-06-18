import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { LoggerService } from '@providers/logging/logger.service';
import { JoinGameX2Dto } from '@socket/dto/join-game-x2.dto';

@WebSocketGateway({ cors: true })
export class GameX2Socket {
  constructor(private _logger: LoggerService) {}

  @SubscribeMessage('join_x2_game')
  public agentInitialize(client: Socket, data: JoinGameX2Dto): void {
    console.log(data);
  }

  @SubscribeMessage('request_bet_x2')
  public requestBetLottery(client: Socket, data: any) {}
}
