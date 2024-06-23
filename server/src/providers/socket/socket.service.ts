import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server } from 'ws';
import { Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class SocketService implements OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('MessageGateway');

  @WebSocketServer() server: Server;

  async handleConnection(client: Socket) {
    return this.logger.log(`Client connected: ${client.id}`);
  }

  public handleDisconnect(client: Socket): void {
    return this.logger.log(`Client disconnected: ${client.id}`);
  }
}
