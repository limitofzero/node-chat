import * as React from 'react';
import Props from '../../interfaces/Contact';
import { ListItem, ListItemText } from "material-ui/List";
import Avatar from 'material-ui/Avatar';

export default function Contact(props: Props) {
    const {name, avatarUrl} = props;

    return <ListItem button>
        <Avatar src={avatarUrl} />
        <ListItemText primary={name} />
    </ListItem>;
}