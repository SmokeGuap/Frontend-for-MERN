import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Alert } from '@mui/material';

import styles from './Login.module.scss';
import { useForm } from 'react-hook-form';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { login } from '../../APIs';

function Login() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState([]);
  const { isAuth, setAuth } = useContext(UserContext);
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
    const result = await login(data);
    if (Array.isArray(result)) {
      setAlert(result);
    }
    if (!Array.isArray(result) && result?.msg) {
      const temp = [];
      temp.push(result);
      setAlert(temp);
    }
    if (result?.token) {
      setAuth(true);
      window.localStorage.setItem('token', result.token);
    }
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
      {alert.length > 0 &&
        alert.map((item, index) => {
          return (
            <Alert className={styles.alert} key={index} severity='error'>
              {item.msg}
            </Alert>
          );
        })}
    </Paper>
  );
}
export default Login;
