import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../App';

function Header() {
  const { isAuth, setAuth } = useContext(UserContext);
  const onClickLogout = () => {
    window.localStorage.removeItem('token');
    setAuth(false);
  };
  return (
    <div className={styles.root}>
      <Container maxWidth='lg'>
        <div className={styles.inner}>
          <Link className={styles.logo} to='/'>
            <div>MERN</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to='/posts/create'>
                  <Button variant='contained'>Написать статью</Button>
                </Link>
                <Button
                  onClick={onClickLogout}
                  variant='contained'
                  color='error'
                >
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to='/login'>
                  <Button variant='outlined'>Войти</Button>
                </Link>
                <Link to='/register'>
                  <Button variant='contained'>Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
export default Header;
