import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'orders',
})
export class OrdersGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(OrdersGateway.name);
  @WebSocketServer()
  server: Server;

  handleConnection(@ConnectedSocket() client: Socket) {
    const { room } = client.handshake.query

    if (!room) {
      return
    }

    client.data.room = room
    client.join(room)
    this.logger.log(`Client connected: ${client.id} to room: ${room}`);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    const { room } = client.data || {}

    if (!room) {
      return
    }

    client.leave(room)
    this.logger.log(`Client disconnected: ${client.id} from room: ${room}`);
  }
}
