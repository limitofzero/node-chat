import * as React from 'react';
import Props from '../../interfaces/Contact';
import { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import Avatar from 'material-ui/Avatar';

export default class Contact extends React.Component<Props> {
    
    render() {
        const {name, avatarUrl} = this.props;

        return <ListItem button>
            <Avatar alt="Remy Sharp" src={avatarUrl} />
            <ListItemText primary={name} />
        </ListItem>
    }
}