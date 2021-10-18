import io, { Socket } from 'socket.io-client';
import { BROADCAST_CHANNEL, SOCKET_IO_ADDR, SOCKET_IO_PATH } from './config';
import { MessageDataTypeEnum, SocketState } from './types';

const ctx: SharedWorker = self as any;
const ports: MessagePort[] = [];

let socket: Socket;
const broadcast = new BroadcastChannel(BROADCAST_CHANNEL);

const socketFactory = (options?: {}) => {
  const socket = io(SOCKET_IO_ADDR, {
    path: SOCKET_IO_PATH,
    transports: [ 'websocket' ],
    ...options
  });

  return socket;
};

const initSocket = () => {
  if (!socket) {
    socket = socketFactory();
  };
  
  socket.on('connect', () => {
    ports.forEach(port => {
      port.postMessage({
        type: MessageDataTypeEnum.STATUS,
        socketState: SocketState.CONNECTED
      });
    });
  });

  socket.on('disconnect', () => {
    ports.forEach(port => {
      port.postMessage({
        type: MessageDataTypeEnum.STATUS,
        socketState: SocketState.DISCONNECTED
      });
    });
  });

  socket.onAny((evt, response) => {
    broadcast.postMessage({
      type: MessageDataTypeEnum.MESSAGE,
      name: evt,
      response
    });
  });

  return socket;
};

const portListener = (evt: MessageEvent) => {
  if (!socket) return;

  const ack = (data: unknown) => {
    evt.ports[ 0 ].postMessage({
      type: MessageDataTypeEnum.ACK,
      ackId: evt.data.ackId,
      response: data
    });
  };

  if (evt.data.toSelf) {
    ports.filter(p => p !== evt.ports[ 0 ]).forEach(p => {
      p.postMessage({
        ...evt.data,
        type: MessageDataTypeEnum.SELF_RELAY
      });
    });
  }

  socket.emit(evt.data.name, {
    ...evt.data.data,
    meta: {
      fromTabId: evt.data.from
    }
  }, ack);
};

ctx.addEventListener('connect', (event: any) => {
  // TODO: Prevent connection from unknown origins
  // if (!VALID_ORIGINS.includes(event.origin)) return;

  const port = event.ports[ 0 ];
  
  if (ports.length === 0) {
    socket = socketFactory(event.data?.options);
    initSocket();
  }

  ports.push(port);  
  port.postMessage({
    type: MessageDataTypeEnum.STATUS,
    socketState: socket?.connected ? SocketState.CONNECTED : SocketState.DISCONNECTED
  });
  port.addEventListener('message', portListener);
});

export default null as any;
