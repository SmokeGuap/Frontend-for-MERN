import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Skeleton from '@mui/material/Skeleton';

import SideBlock from './SideBlock/SideBlock.jsx';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { Fragment } from 'react';

function CommentsBlock({ me, items, children, isLoading = true }) {
  return (
    <SideBlock title='Комментарии'>
      <List>
        {(isLoading ? [...Array(5)] : items).map((obj, index) => (
          <Fragment key={index}>
            <ListItem alignItems='flex-start'>
              {isLoading ? (
                <>
                  <ListItemAvatar>
                    <Skeleton variant='circular' width={40} height={40} />
                  </ListItemAvatar>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Skeleton variant='text' height={25} width={120} />
                    <Skeleton variant='text' height={18} width={230} />
                  </div>
                </>
              ) : (
                <>
                  <ListItemAvatar>
                    <Avatar
                      alt={obj.author.fullName}
                      src={obj.author.avatarUrl}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={obj.author.fullName}
                    secondary={obj.text}
                  />
                  {obj?.author._id == me?._id ? (
                    <div>
                      <IconButton color='primary'>
                        <EditIcon />
                      </IconButton>
                      <IconButton color='secondary'>
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  ) : null}
                </>
              )}
            </ListItem>
            <Divider variant='inset' />
          </Fragment>
        ))}
        {children}
      </List>
    </SideBlock>
  );
}
export default CommentsBlock;
