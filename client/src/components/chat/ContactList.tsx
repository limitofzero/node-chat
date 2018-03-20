import * as React from 'react';
import List from "material-ui/List";
import Props from '../../interfaces/ContactList';
import Contact from './Contact';
import '../../styles/components/contact-list.scss';

export default class ContactList extends React.Component<Props> {
    
    render() {
        const {list} = this.props;

        return <div className='contact-list'>
            <List>
                {list.map(contact => <Contact key={contact.id} {...contact}/>)}
            </List>
        </div>
    }
}