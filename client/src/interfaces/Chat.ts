import Message from './Message';
import Contact from './Contact';

interface Chat {
    readonly messages: Message[],
    readonly contacts: Contact[]
}

export default Chat;