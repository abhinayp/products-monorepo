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
  namespace: 'products',
})
export class ProductssGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(ProductssGateway.name);
  @WebSocketServer()
  server: Server;

  handleConnection(@ConnectedSocket() client: Socket) {
    const { rooms } = client.handshake.query as { rooms: string[] }

    if (!rooms) {
      return
    }

    client.data.rooms = rooms
    rooms.forEach(room => client.join(room))
    this.logger.log(`Client connected: ${client.id} to rooms: ${rooms}`);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    const { rooms } = client.data || {}

    if (!rooms) {
      return
    }

    rooms.forEach(room => client.leave(room))
    this.logger.log(`Client disconnected: ${client.id} from rooms: ${rooms}`);
  }
}
