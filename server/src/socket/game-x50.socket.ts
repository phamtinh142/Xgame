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

@WebSocketGateway({ cors: true, namespace: 'game-x50' })
export class GameX50Socket implements OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('MessageGateway');

  @WebSocketServer() server: Server;

  async handleConnection(client: Socket) {
    return this.logger.log(`Client connected: ${client.id}`);
  }

  public handleDisconnect(client: Socket): void {
    return this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join_x50_game')
  public agentInitialize(client: Socket, data: any): void {
    console.log('join_x50_game: ', data);
  }

  @SubscribeMessage('request_bet_x50')
  public requestBetLottery(client: Socket, data: any) {
    console.log('request_bet_x50: ', data);
  }
}
