

export function initWebSocketServerStore(io, store){
  store.subscribe(
      () => io.emit('state', store.getState().toJS())
  );
  
  io.on('connection', (socket) => {
    console.log('connected to websockets server');
    
    socket.emit('state', store.getState().toJS());
    socket.on('action', store.dispatch.bind(store));
  });
  
}