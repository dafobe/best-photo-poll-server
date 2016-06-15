import {startServer} from './webSocketServer';
import {initWebSocketServerStore} from './store';


export function initServer(){
  return startServer();
};