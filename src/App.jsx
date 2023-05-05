import Container from '@mui/material/Container';

import { Header } from './components';
import { Home, FullPost, Registration, AddPost, Login } from './pages';
import { Route, Routes } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';
import { authMe } from './APIs';

export const UserContext = createContext();
function App() {
  const [user, setUser] = useState({});
  const [isAuth, setAuth] = useState(
    Boolean(window.localStorage.getItem('token'))
  );

  useEffect(() => {
    authMe().then((data) => {
      setUser(data);
    });
  }, [isAuth]);
  return (
    <>
      <UserContext.Provider value={{ isAuth, setAuth, user }}>
        <Header />
        <Container maxWidth='lg'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/posts/:id' element={<FullPost />} />
            <Route path='/posts/:id/edit' element={<AddPost />} />
            <Route path='/addpost' element={<AddPost />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Registration />} />
          </Routes>
        </Container>
      </UserContext.Provider>
    </>
  );
}

export default App;
