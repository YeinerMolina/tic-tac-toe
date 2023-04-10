import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

// Server
import { Server } from './server';
// Middlewares
import { router } from './routes';
// encrypt
import { sockets } from './sockets/sockets';

// Get instance
const server = Server.getInstance;
// Middlewares nivel aplication
server.app.use(morgan('dev'));
server.app.use(express.json());
server.app.use(express.urlencoded({ extended: false }));
server.app.use(cors());

process.env.NODE_ROOT_PATH = __dirname;
process.env.NODE_REPORT_PATH = path.join(__dirname, '/public/reports');

server.app.use('/public', express.static(path.join(__dirname, '/public')));

// Router
server.app.use(router);

// Iniciar Servidor
server.start();

// Iniciar sockets
sockets.start(server.httpServer);
