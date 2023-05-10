import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { ListItem, ListItemAvatar } from '@mui/material';

function AddComment({ me }) {
  return (
    <ListItem alignItems='flex-start'>
      <ListItemAvatar>
        <Avatar alt='sdgfgsd' src={me.avatarUrl} />
      </ListItemAvatar>
      <TextField label='Комментировать' fullWidth variant='standard' />
      <Button
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
