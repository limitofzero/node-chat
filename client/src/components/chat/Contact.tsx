import * as React from 'react';
import List from 'material-ui/List';
import Props from '../../interfaces/Contact';
import {ListItemIcon, ListItemText} from 'material-ui/List';

export default class Contact extends React.Component<Props> {
    
    render() {
        const {name} = this.props;

        return <div className='contact'>
            <div className='contact__name'>{name}</div>
        </div>
    }
}