import { Server, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { NextFunction } from 'express';

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

      socket.on('client: joinRoom', (room: string) => {
        socket.join(`room: ${room}`);
        console.log(`Connected to ${room}`);
      });
    });
  }
}

export const sockets = new Sockets();
