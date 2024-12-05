import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger, OnApplicationShutdown } from '@nestjs/common';
import { Server } from 'ws';
import { Socket } from 'socket.io';
import { GameDoubleService } from '@services/game-double.service';

@WebSocketGateway({ cors: true, namespace: 'game-x2' })
export class GameDoubleSocket
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, OnApplicationShutdown
{
  private logger: Logger = new Logger('MessageGateway');

  @WebSocketServer() server: Server;

  constructor(private readonly _gameDoubleService: GameDoubleService) {}

  afterInit() {
    this._gameDoubleService.onGameDoubleSubject.subscribe(({ name, data }) => this.server.emit(name, data));
  }

  async handleConnection(client: Socket) {
    return this.logger.log(`Client connected: ${client.id}`);
  }

  public handleDisconnect(client: Socket): void {
    return this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join_x2_game')
  public agentInitialize(client: Socket, data: any): void {
    console.log('join_x2_game: ', data);
  }

  @SubscribeMessage('request_bet_x2')
  public requestBetLottery(client: Socket, data: any) {
    console.log('request_bet_x2: ', data);
  }

  onApplicationShutdown() {}
}
