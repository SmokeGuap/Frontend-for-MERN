import SideBlock from './SideBlock/SideBlock.jsx';
import { AddComment } from '../components/index.js';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Skeleton from '@mui/material/Skeleton';

import { Button, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/ArrowForwardIos';
import { Fragment, useState } from 'react';
import { deleteComment, editComment } from '../APIs/index.js';
import { queryClient } from '../main.jsx';
import { useMutation } from 'react-query';

function CommentsBlock({ me, items, isLoading = true }) {
  const [comment, setComment] = useState({ id: '', text: '' });
  const deleteMutation = useMutation((id) => deleteComment(id), {
    onSuccess: () => queryClient.invalidateQueries(['comment']),
  });

  const onClickRemove = (id) => {
    deleteMutation.mutate(id);
  };
  const updateMutation = useMutation(
    (comment) => editComment(comment.id, { text: comment.text }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['comment']);
        setComment({ id: '', text: '' });
      },
    }
  );

  const onClickUpdate = (comment) => {
    updateMutation.mutate(comment);
  };
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
                  {obj._id == comment.id ? (
                    <>
                      <TextField
                        onChange={(e) => {
                          setComment({ ...comment, text: e.target.value });
                        }}
                        value={comment.text}
                        label='Комментировать'
                        fullWidth
                        variant='standard'
                      />
                      <Button
                        onClick={() => {
                          onClickUpdate(comment);
                        }}
                        style={{
                          marginLeft: '1rem',
                          height: '3rem',
                        }}
                        type='submit'
                        variant='contained'
                      >
                        Отправить
                      </Button>
                      <IconButton
                        onClick={() => setComment({ id: '', text: '' })}
                        color='primary'
                      >
                        <CancelIcon fontSize='large' />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <ListItemText
                        primary={obj.author.fullName}
                        secondary={obj.text}
                      />
                      {obj?.author._id == me?._id ? (
                        <div>
                          <IconButton
                            onClick={() =>
                              setComment({ id: obj._id, text: obj.text })
                            }
                            color='primary'
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => onClickRemove(obj._id)}
                            color='secondary'
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      ) : null}
                    </>
                  )}
                </>
              )}
            </ListItem>
            <Divider variant='inset' />
          </Fragment>
        ))}
        {me && <AddComment me={me} />}
      </List>
    </SideBlock>
  );
}
export default CommentsBlock;
