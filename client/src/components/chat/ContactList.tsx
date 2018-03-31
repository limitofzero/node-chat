import * as React from 'react';
import List from "material-ui/List";
import Props from '../../interfaces/ContactList';
import Contact from './Contact';
import '../../styles/components/contact-list.scss';

function ContactList(props: Props) {
    const {list} = props;

    return <div className='contact-list'>
        <List>
            {list.map(contact => <Contact key={contact.id} {...contact}/>)}
        </List>
    </div>;
}

export default ContactList;