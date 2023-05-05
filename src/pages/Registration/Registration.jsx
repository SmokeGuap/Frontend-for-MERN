import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../App';
import { useForm } from 'react-hook-form';
import { reg } from '../../APIs';

function Registration() {
  const navigate = useNavigate();
  const { isAuth } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth]);

  const onSumbit = async (data) => {
    const result = await reg(data);
    if (result == 'Не удалось зарегистрироваться') {
      alert('Не удалось зарегистрироваться');
    } else {
      navigate('/login');
    }
  };
  const isValidEmail = (email) =>
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  const handleEmailValidation = (email) => {
    const isValid = isValidEmail(email);
    return isValid;
  };
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant='h5'>
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSumbit)}>
        <TextField
          {...register('fullName', {
            required: 'Укажите полное имя',
            minLength: 6,
          })}
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          className={styles.field}
          label='Полное имя'
          fullWidth
        />
        <TextField
          type='email'
          {...register('email', {
            required: 'Укажите почту',
            validate: handleEmailValidation,
          })}
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          className={styles.field}
          label='E-Mail'
          fullWidth
        />
        <TextField
          type='password'
          className={styles.field}
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', {
            required: 'Укажите пароль',
            minLength: 8,
          })}
          label='Пароль'
          fullWidth
        />
        <Button
          disabled={!isValid}
          type='submit'
          size='large'
          variant='contained'
          fullWidth
        >
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
}
export default Registration;
