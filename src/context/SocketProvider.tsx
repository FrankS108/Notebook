import { useEffect, useRef, useState } from 'react';
import { SocketContext } from "./SocketContext";
import { WebrtcProvider } from 'y-webrtc';
import * as Yjs from 'yjs';

const signalServer = 'ws://localhost:5000';

interface props {
    children: JSX.Element | JSX.Element[];
}

interface socketData {
    type: string;
    room?: string;
    data?: string;
}

export const SocketProvider = ({ children }: props) => {
    const [room, setRoom] = useState<string>('');
    const [connected, setConnected] = useState<boolean>(false);
    const ws = useRef<WebSocket | null>(null);
    const yDoc = useRef<Yjs.Doc>(new Yjs.Doc());

    useEffect(() => {
        let new_room = new URLSearchParams(window.location.search).get('room');
        if (new_room) {
            setRoom(new_room);
            connectWebSocket(new_room);
        }
        else {
            createRoom();
        }
        //enabling y-webrtc logging
        localStorage.log = 'y-webrtc:*';
        //this is the whole thing about rtc, currently comunnicate correctly
        const provider = new WebrtcProvider(room, yDoc.current, { signaling: [signalServer] });

        const yText = yDoc.current.getText('editor');
        
        //the thing is handle the yjs eventsssssssss
        yText.observe(event => {
            console.log('Yjs event', event);
        });
    }, []);

    const createRoom = () => {
        const new_room_id: string = crypto.randomUUID();
        setRoom(new_room_id);
        window.history.pushState(null, '', `?room=${new_room_id}`);
        connectWebSocket(new_room_id);
    }
    
    const connectWebSocket = (room: string) => {
        ws.current = new WebSocket(signalServer);
        ws.current.onopen = () => {
            setConnected(true);
            ws.current?.send(JSON.stringify({ type: 'join', room: room }));
        };

        ws.current.onmessage = (message) => {
            const data:socketData = JSON.parse(message.data);
            switch (data.type) {
                case 'joined':
                    console.log('Joined room');
                    break;
                case 'update':
                    console.log('Update received');
                    break;
                default:
                    console.log('Unknown message type');
            }    
        };

        ws.current.onclose = () => {
            console.log('Connection closed');
            setConnected(false);
        };

        return () => {
            ws.current?.close();
        };
    };

    return (
        <SocketContext.Provider value={{
                ws: ws.current, 
                room: room, 
                connected: connected, 
                setConnected: setConnected, 
                yDoc: yDoc.current 
            }}>
            {children}
        </SocketContext.Provider>
    );
}