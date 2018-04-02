import * as io from 'socket.io-client';
import { SOCKET_CONNECTED, ADD_CONTACT, DELETE_CONTACT, RECEIVE_CONTACT_LIST, RECEIVE_MESSAGE, SEND_MESSAGE } from '../constants/actions';
import * as socketActions from '../actions/socketActions';
import store from '../store';

export default class WebsockService {
    private static sock: SocketIOClient.Socket = null;

    static connect(): void {
        if(this.sock) {
            return;
        }

        this.sock = io.connect('http://localhost:8080');
        this.subscribe();
    }

    static sendMessage(message: string) {
        if(this.sock) {
            this.sock.emit(SEND_MESSAGE, message);
        }
    }

    private static subscribe(): void {
        const sockActionMap: {[propName: string] : Function} = {
            SOCKET_CONNECTED: socketActions.socketConnected,
            ADD_CONTACT: socketActions.addContact,
            RECEIVE_CONTACT_LIST: socketActions.receiveContactList,
            DELETE_CONTACT: socketActions.deleteContact,
            RECEIVE_MESSAGE: socketActions.receiveMessage
        };

        Object.keys(sockActionMap).forEach(type => {
            const action: Function = sockActionMap[type];
            this.sock.on(type, (recieveObj: any) => store.dispatch(action(recieveObj)));
        });
    }
}