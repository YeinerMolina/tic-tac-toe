import { Server, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export class Sockets {
  private server!: Server;
  private allSockets: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>[] = [];

  get Server() {
    return this.server;
  }

  get AllSockets() {
    return this.allSockets;
  }

  start(httpServer: HttpServer) {
    this.server = new Server(httpServer, {
      cors: {
        origin: '*',
      },
    });
    return this.server.on('connection', socket => {
      this.allSockets.push(socket);

      socket.on('client: joinDataRead', () => {
        socket.join('realTimeSender');
      });
    });
  }
}

export const sockets = new Sockets();
