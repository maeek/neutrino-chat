import { BROADCAST_CHANNEL } from './config';
import { v4 as uuidv4 } from 'uuid';
import SocketWorker from './socket.shared-worker';
import { MessageDataTypeEnum, SocketState } from './types';

export class SocketService {
  readonly id: string;
  
  readonly worker: SharedWorker;

  readonly comm: BroadcastChannel;

  private _observers: { [name: string]: Function[] } = {};

  private _state = SocketState.DISCONNECTED;

  constructor() {
    this.id = uuidv4();
    
    this.worker = new SocketWorker();
    this.worker.port.addEventListener('message', this.onWorkerMessage);
    this.worker.port.start();

    this.comm = new BroadcastChannel(BROADCAST_CHANNEL);
    this.comm.addEventListener('message', this.onBroadcastMessage);
  }

  private onWorkerMessage = (message: MessageEvent) => {
    if (message.data.type === MessageDataTypeEnum.ACK) {
      this._observers[ message.data.ackId ]?.[ 0 ]?.(message);
    }

    else if (message.data.type === MessageDataTypeEnum.SELF_RELAY) {
      this._notify(message);
    }

    else if (message.data.type === MessageDataTypeEnum.STATUS) {
      this._state = message.data.socketState;
    }
  };

  private onBroadcastMessage = (message: MessageEvent) => {
    if (message.data.from === this.id) {
      console.warn('Broadcast received from same origin');
    }

    this._notify(message);
  };

  private _notify = (message: MessageEvent) => {
    const { name } = message.data.name;

    this._observers[ name ]?.forEach(fn => fn(message.data));
  };

  emit = (name: string, data?: any, ack?: Function, toSelf?: boolean, type?: string) => {
    if (this.status !== SocketState.CONNECTED) {
      throw new Error('Socket connection error - cannot send data when socket is closed.');
    }

    const ackId = uuidv4();
    if (ack) {
      this._observers[ ackId ] = [ ack ];
    }

    this.worker.port.postMessage({
      type: type || MessageDataTypeEnum.MESSAGE,
      from: this.id,
      name,
      ackId,
      toSelf,
      data: {
        name,
        ...data
      }
    });
  };

  on = <T = unknown>(name: string, func: (data: T) => void) => {
    if (!this._observers[ name ]) {
      this._observers[ name ] = [];
    }

    if (!this._observers[ name ].includes(func)) {
      this._observers[ name ].push(func);
    }
  }

  onSelf = <T = unknown>(func: (data: T) => void) => {
    if (!this._observers.self) {
      this._observers.self = [];
    }

    if (!this._observers.self.includes(func)) {
      this._observers.self.push(func);
    }
  }

  off = (name: string, func?: Function) => {
    if (!func || !this._observers[ name ] || !this._observers[ name ].includes(func)) {
      return;
    }

    if (!func) {
      this._observers[ name ] = [];
      return;
    }

    this._observers[ name ] = this._observers[ name ].filter(f => f !== func);
  };

  offSelf = (func: Function) => {
    if (!func || !this._observers.self || !this._observers.self.includes(func)) {
      return;
    }

    if (!func) {
      this._observers.self = [];
      return;
    }

    this._observers.self = this._observers.self.filter(f => f !== func);
  };

  offAll = () => {
    this._observers = {};
  };

  get status() {
    return this._state;
  }

  get broadcast() {
    return this.comm;
  }
}
