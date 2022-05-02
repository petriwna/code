import React from 'react';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, ListItemText } from '@mui/material';
import Typography from '@mui/material/Typography';

import { CustomLink } from '../CustomLink';
import { Note } from '../../mainSlice';

export function NoteListItem({ note }: { note: Note }) {
  const date = note?.createdAt ? new Date(note.createdAt * 1000).toDateString() : '';
  return (
    <List
      noteid={note.id}
      component={CustomLink}
      sx={{ width: '100%', color: 'black', padding: '10px', bgcolor: `${note.color}`, borderRadius: '10px' }}
      elevation={3}
    >
      <ListItemText
        primary={
          <div>
            <Typography sx={{ lineHeight: 0 }} variant="overline">
              {note?.title}
            </Typography>
            <Typography>{note?.preview}</Typography>
          </div>
        }
        secondary={date}
      />
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'end', marginRight: '15px', marginBottom: '15px' }}>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="settings" edge="end">
          <MoreVertIcon />
        </IconButton>
      </Box>
    </List>
  );
}
