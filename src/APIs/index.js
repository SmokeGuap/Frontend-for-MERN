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
async function getPost() {
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

export { getPosts, getPost, getTags, login, reg };
