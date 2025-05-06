import { Server } from "http";
import {Server as SocketServer} from "socket.io";

let io: SocketServer | null = null;
const initializeSocket = (server: Server) => {
    try{
        io = new SocketServer(server, {cors: {origin: '*', methods: ['GET', 'POST']}});
        if(io){
            console.log("Socket initialized");
        }
        io.on('connection', (socket) => {
            console.log("socket connected");
            socket.on('disconnect', () => {
                console.log("socket disconnected");
            })
        })
    }
    catch(error){
        console.log("Socket error:", error);
    }
}

export const getSocket = (): SocketServer => {
    if(!io){
        throw new Error("Socket not initialized");
    }
    return io;
}

export default initializeSocket;