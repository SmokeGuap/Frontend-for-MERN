import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import TagIcon from '@mui/icons-material/Tag';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
import { Button, Typography } from '@mui/material';

import SideBlock from './SideBlock/SideBlock.jsx';
import { useEffect, useState } from 'react';

function TagsBlock({ items, isLoading = true, tagsFilter }) {
  const [tag, setTag] = useState('');
  useEffect(() => {
    tagsFilter(tag);
  }, [tag]);

  return (
    <SideBlock title='Теги'>
      <Button
        onClick={() => setTag('')}
        size='large'
        variant='contained'
        fullWidth
      >
        Обнулить тег
      </Button>
      <List>
        {(isLoading ? [...Array(5)] : items).map((name, i) => (
          <ListItem key={i} disablePadding onClick={() => setTag(name)}>
            <ListItemButton>
              <ListItemIcon>
                <TagIcon />
              </ListItemIcon>
              {isLoading ? (
                <Skeleton width={100} />
              ) : (
                <ListItemText primary={name} />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {/* <Typography variant='h4' color='primary' align='center'>
        #{tag}
      </Typography> */}
    </SideBlock>
  );
}
export default TagsBlock;
