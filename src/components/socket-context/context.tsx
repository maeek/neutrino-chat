import { notifyUser } from '@/actions/notify';
import { getAuthToken } from '@/selectors/session';
import { getMeUsername } from '@/selectors/user';
import { addMessages } from '@/store/messages/actions';
import { MessageTypes } from '@/store/messages/types';
import throttle from 'lodash.throttle';
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io, { Socket } from 'socket.io-client';

export interface SocketContext {
  socket?: Socket;
  isConnected?: boolean;
  sendMessage: (data: any) => void;
  joinPublicChannel: (name: string) => void;
}

const socketContext = createContext<SocketContext | undefined>(undefined);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const authToken = useSelector(getAuthToken);
  const username = useSelector(getMeUsername);
  const socket = useRef<Socket>();
  const [isConnected, setIsConnected] = useState(false);
  const dispatch = useDispatch();
  const throttleRef = useRef(
    throttle(() => {
      dispatch(notifyUser('message'));
    }, 1000)
  );

  useEffect(() => {
    if (!authToken || !username) return;

    const skt = io('/', {
      path: '/ws',
      extraHeaders: {
        Authorization: authToken
      },
      autoConnect: true,
      withCredentials: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 3000
    });

    const onConnect = () => {
      setIsConnected(true);
      console.log('SocketProvider', 'connected');
    };
    const onDisconnect = () => {
      setIsConnected(false);
      console.log('SocketProvider', 'disconnected');
    };

    const onMessage = (data: any) => {
      console.log('SocketProvider', 'onMessage', data);
      const type = data.type ? MessageTypes.CHANNEL : MessageTypes.DIRECT;

      let parentId = data.toId;
      if (type === MessageTypes.CHANNEL) {
        parentId = data.toId;
      } else if (type === MessageTypes.DIRECT) {
        if (data.fromId === username) {
          parentId = data.toId;
        } else {
          parentId = data.fromId;
        }
      }

      dispatch(
        addMessages(
          [
            {
              parentId,
              uuid: data.serverUuid,
              body: data.body,
              timeReceived: Date.now(),
              timeSent: data.timeSent,
              read: false,
              senderId: data.fromId,
              attachments: data.attachments.map((a: any) => a.uuid),
              type
            }
          ],
          data.attachments
        )
      );

      if (data.fromId !== username) {
        throttleRef.current();
      }
    };

    skt.on('connect', onConnect);
    skt.on('disconnect', onDisconnect);
    skt.on('message', onMessage);

    socket.current = skt;
    (window as any).socket = socket;
    return () => {
      skt.disconnect();
      skt.off('disconnect', onDisconnect);
      skt.off('connect', onConnect);
      skt.off('message', onMessage);
    };
  }, [dispatch, authToken, username]);

  const sendMessage = useCallback((data: any) => {
    socket.current?.emit('message', data);
  }, []);

  const joinPublicChannel = useCallback((name: string) => {
    socket.current?.emit('joinChannel', {
      name
    });
  }, []);

  return (
    <socketContext.Provider
      value={{
        socket: socket.current,
        isConnected,
        sendMessage,
        joinPublicChannel
      }}
    >
      {children}
    </socketContext.Provider>
  );
};

export const useSocketContext = () => {
  const context = useContext(socketContext);
  if (context === undefined) {
    throw new Error('useSocketContext must be used within a SocketProvider');
  }
  return context;
};
