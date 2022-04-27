import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { DefaultComponentProps } from '@mui/material/OverridableComponent';
import { ListItem } from '@mui/material';

type Props = {
  data: any | undefined;
};

function ListLink(props: DefaultComponentProps<any>) {
  const { noteid } = props;

  return <Link {...props} to={`/editor/${noteid}`} component={RouterLink} sx={{ textDecoration: 'none' }} />;
}

export function NoteListItem({ data }: Props) {
  const date = data?.createdAt ? new Date(data.createdAt * 1000).toDateString() : '';
  return (
    <List
      noteid={data.id}
      component={ListLink}
      sx={{ width: '20%', bgcolor: `${data.color}`, color: 'black' }}
      elevation={3}
    >
      <ListItem>{data?.title}</ListItem>
      <ListItem>{data?.preview}</ListItem>
      <ListItem>{date}</ListItem>

      <IconButton aria-label="add to favorites">
        <FavoriteIcon />
      </IconButton>
      <IconButton aria-label="share">
        <ShareIcon />
      </IconButton>
      <IconButton aria-label="settings" edge="end">
        <MoreVertIcon />
      </IconButton>
    </List>
  );
}
