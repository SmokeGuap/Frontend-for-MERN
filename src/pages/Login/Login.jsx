import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import styles from './Login.module.scss';
import { useForm } from 'react-hook-form';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const { isAuth, setAuth } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth]);
  async function login(data) {
    const res = await fetch('http://localhost:4000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const user = await res.json();
    if (!res) {
      alert('Не удалось авторизоваться');
    }
    if (res.hasOwnProperty('token')) {
      window.localStorage.setItem('token', res.token);
      setAuth(true);
    }
  }

  const onSumbit = (data) => {
    login(data);
  };

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant='h5'>
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSumbit)}>
        <TextField
          className={styles.field}
          label='E-Mail'
          type='email'
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: 'Укажите почту' })}
          fullWidth
        />
        <TextField
          type='password'
          className={styles.field}
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'Укажите пароль' })}
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
          Войти
        </Button>
      </form>
    </Paper>
  );
}
export default Login;
