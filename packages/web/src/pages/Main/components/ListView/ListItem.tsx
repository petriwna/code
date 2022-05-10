import React from 'react';
import ItemList from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import { Note } from '../../mainSlice';
import { CustomLink } from '../CustomLink';

export function ListItem({ note }: { note: Note }) {
  const date = note?.createdAt ? new Date(note.createdAt * 1000).toDateString() : '';

  return (
    <ItemList component={CustomLink} noteid={note.id}>
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: note.color }}>{note.title.charAt(0)}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={note.title} secondary={date} />
    </ItemList>
  );
}
