import { Server } from "http";
import {Server as SocketServer} from 'socket.io'
import jwt from 'jsonwebtoken';
import { userSocketMap } from "./src/utils/helper";

let io: SocketServer | null = null
export const initializeSocket = (server: Server) => {
    io = new SocketServer(server, {cors: {allowedHeaders: '*', methods: ['GET', 'POST']}});
    io.on('connection', (socket) => {
        const {token}: any = socket.handshake.query;
        jwt.verify(token, process.env.SECRET_KEY || 'my secret key', (err: any, decoded: any) => {
            if(err){
                console.log('Unauth user');
                socket.disconnect();
                return;
            }
            const user = decoded;
            userSocketMap.set(user.id, socket.id); 
            console.log(userSocketMap);
        });
        socket.on('disconnect', () => {
            console.log('disocnnected');
        })
    })
}

export const getSocketIO = (): SocketServer | null => {
    return io ? io : null;
}