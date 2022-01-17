import Container from '@mui/material/Container';

import { Header } from './components';
import { Home, FullPost, Registration, AddPost, Login } from './pages';
import { Route, Routes } from 'react-router-dom';
import { createContext, useState } from 'react';

export const UserContext = createContext();
function App() {
  const [isAuth, setAuth] = useState(
    Boolean(window.localStorage.getItem('token'))
  );
  // async function authMe() {
  //   const res = await fetch('http://localhost:4000/auth/me', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: 'Bearer ' + window.localStorage.getItem('token'),
  //     },
  //   });
  //   const user = await res.json();
  // }
  // useEffect(() => {
  //   authMe();
  // }, []);
  return (
    <>
      <UserContext.Provider value={{ isAuth, setAuth }}>
        <Header />
        <Container maxWidth='lg'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/posts/:id' element={<FullPost />} />
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
