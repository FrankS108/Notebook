import { createContext } from 'react';
import { SocketContext as InterfaceContext  } from '../interfaces/interfaces';
export const SocketContext = createContext<InterfaceContext>({} as InterfaceContext);