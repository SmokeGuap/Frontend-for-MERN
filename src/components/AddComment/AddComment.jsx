import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { ListItem, ListItemAvatar } from '@mui/material';
import { useState } from 'react';
import { addComment } from '../../APIs';
import { useParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import { queryClient } from '../../main';

function AddComment({ me }) {
  const { id } = useParams();
  const createCommentMutation = useMutation((data) => addComment(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['comment']);
      setComment('');
    },
  });
  const handleSubmit = () => {
    createCommentMutation.mutate({ text: comment, post: id });
  };
  const [comment, setComment] = useState('');
  return (
    <ListItem alignItems='flex-start'>
      <ListItemAvatar>
        <Avatar alt='sdgfgsd' src={me.avatarUrl} />
      </ListItemAvatar>
      <TextField
        onChange={(e) => setComment(e.target.value)}
        value={comment}
        label='Комментировать'
        fullWidth
        variant='standard'
      />
      <Button
        onClick={handleSubmit}
        style={{
          marginLeft: '1rem',
          height: '3rem',
        }}
        type='submit'
        variant='contained'
      >
        Отправить
      </Button>
    </ListItem>
  );
}
export default AddComment;
