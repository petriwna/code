import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// type Props = {
//   data: any | undefined;
// };

export function BasicList() {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List>
        <ListItemButton>
          <ListItemIcon>
            <IconButton arial-label="settings">
              <MoreVertIcon />
            </IconButton>
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItemButton>
      </List>
    </Box>
  );
}
