import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server } from 'ws';
import { Socket } from 'socket.io';
import { JoinGameX2Dto } from '@socket/dto/join-game-x2.dto';

@WebSocketGateway({ cors: true, namespace: 'game-x2' })
export class GameX2Socket implements OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('MessageGateway');

  @WebSocketServer() server: Server;

  async handleConnection(client: Socket) {
    return this.logger.log(`Client connected: ${client.id}`);
  }

  public handleDisconnect(client: Socket): void {
    return this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join_x2_game')
  public agentInitialize(client: Socket, data: JoinGameX2Dto): void {
    console.log('join_x2_game: ', data);
  }

  @SubscribeMessage('request_bet_x2')
  public requestBetLottery(client: Socket, data: any) {
    console.log('request_bet_x2: ', data);
  }
}
