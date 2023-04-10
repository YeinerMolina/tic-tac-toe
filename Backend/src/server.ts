import express, { Application } from 'express';
import { CONFIG } from './config/env';
import net from 'net';
import http from 'http';

export class Server {
  private static instance: Server;
  public app: Application;
  public tcpServer!: net.Server;
  public httpServer: any;

  private port: number;

  private constructor() {
    this.app = express();
    this.httpServer = new http.Server(this.app);
    this.port = Number(CONFIG.PUERTO);
    this.tcpServer = net.createServer();
  }

  public static get getInstance() {
    return this.instance || (this.instance = new this());
  }

  public async start() {
    this.httpServer.listen(this.port, () => {
      console.log(`Server running on http://localhost:${this.port}`);
    });
  }
}
