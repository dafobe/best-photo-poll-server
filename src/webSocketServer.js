import Server from 'socket.io';


export function startServer (httpServer){
  return new Server().attach(8090);
}
