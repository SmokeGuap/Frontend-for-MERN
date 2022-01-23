async function getPosts() {
  const res = await fetch('http://localhost:4000/posts');
  const data = await res.json();
  return data;
}
async function getTags() {
  const res = await fetch('http://localhost:4000/posts/tags');
  const data = await res.json();
  return data;
}
async function getPost(id) {
  const res = await fetch(`http://localhost:4000/posts/${id}`);
  const data = await res.json();
  return data;
}
async function login(data) {
  const res = await fetch('http://localhost:4000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res) {
    alert('Не удалось авторизоваться');
  }
  if (res.hasOwnProperty('token')) {
    window.localStorage.setItem('token', res.token);
    setAuth(true);
  }
}
async function reg(data) {
  const res = await fetch('http://localhost:4000/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    alert('Не удалось зарегистрироваться');
  } else {
    navigate('/login');
  }
}
async function authMe() {
  const res = await fetch('http://localhost:4000/auth/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + window.localStorage.getItem('token'),
    },
  });
  const user = await res.json();
  return user;
}
async function upload(data) {
  const res = await fetch('http://localhost:4000/uploads', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + window.localStorage.getItem('token'),
    },
    body: data,
  });
  const result = await res.json();
  return result;
}
async function addPost(data) {
  const res = await fetch('http://localhost:4000/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + window.localStorage.getItem('token'),
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  return result;
}
async function editPost(id,data) {
  const res = await fetch(`http://localhost:4000/posts/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + window.localStorage.getItem('token'),
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  return result;
}
async function deletePost(id) {
  const res = await fetch(`http://localhost:4000/posts/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + window.localStorage.getItem('token'),
    },
  });
  const result = await res.json();
}
export {
  getPosts,
  getPost,
  getTags,
  login,
  reg,
  authMe,
  upload,
  addPost,
  deletePost,
  editPost,
};
