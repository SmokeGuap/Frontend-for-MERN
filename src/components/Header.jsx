function Header() {
  const isAuth = false;

  return (
    <div>
      <div>
        <a href='/'>
          <div>MERN</div>
        </a>
        <div>
          {isAuth ? (
            <>
              <a href='/posts/create'>
                <button>Написать статью</button>
              </a>
              <button>Выйти</button>
            </>
          ) : (
            <>
              <a href='/login'>
                <button>Войти</button>
              </a>
              <a href='/register'>
                <button>Создать аккаунт</button>
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default Header;
