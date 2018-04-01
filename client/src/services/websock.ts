import * as io from 'socket.io-client';
import { SOCKET_CONNECTED, ADD_CONTACT, DELETE_CONTACT, RECEIVE_CONTACT_LIST } from '../constants/actions';
import * as socketActions from '../actions/socketActions';
import store from '../store';

const sockActions: {[propName: string] : Function} = {
    SOCKET_CONNECTED: socketActions.socketConnected,
    ADD_CONTACT: socketActions.addContact,
    RECEIVE_CONTACT_LIST: socketActions.receiveContactList,
    DELETE_CONTACT: socketActions.deleteContact
}

export default class WebsockService {
    private static sock: SocketIOClient.Socket = null;

    static connect(): void {
        if(this.sock) {
            return;
        }

        this.sock = io.connect('http://localhost:8080');
        this.subscribe();
    }

    private static subscribe(): void {
        Object.keys(sockActions).forEach(type => {
            const action: Function = sockActions[type];
            this.sock.on(type, (recieveObj: any) => store.dispatch(action(recieveObj)));
        });
    }
}