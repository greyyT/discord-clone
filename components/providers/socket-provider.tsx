'use client';

import { useEffect, useState } from 'react';
import { io as ClientIO } from 'socket.io-client';

import { SocketContext } from '@/hooks/socket';

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socketInstance = new (ClientIO as any)('http://localhost:3000', {
      path: '/api/socket/io',
      addTrailingSlash: false,
    });

    socketInstance.on('connect', () => setIsConnected(true));

    socketInstance.on('disconnect', () => setIsConnected(false));

    setSocket(socketInstance);

    return () => socketInstance.disconnect();
  }, []);

  return <SocketContext.Provider value={{ socket, isConnected }}>{children}</SocketContext.Provider>;
};
