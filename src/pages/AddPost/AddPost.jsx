import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import styles from './AddPost.module.scss';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import { addPost, editPost, getPost, upload } from '../../APIs';

function AddPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuth } = useContext(UserContext);
  const isEdit = Boolean(id);

  const [post, setPost] = useState({
    imageUrl: '',
    title: '',
    tags: '',
    text: '',
  });
  const inputRef = useRef(null);

  useEffect(() => {
    try {
      if (id) {
        getPost(id).then((data) => {
          setPost({
            imageUrl: data.imageUrl,
            title: data.title,
            tags: data.tags.join(','),
            text: data.text,
          });
        });
      } else {
        setPost({
          imageUrl: '',
          title: '',
          tags: '',
          text: '',
        });
      }
    } catch (error) {
      console.warn(error);
    }
  }, [id]);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const data = await upload(formData);
      setPost({ ...post, imageUrl: data.url });
    } catch (error) {
      console.warn(error);
      alert('Ошибка загрузки файла');
    }
  };

  const onClickRemoveImage = () => {
    setPost({ ...post, imageUrl: '' });
  };

  const onChange = (value) => {
    setPost({ ...post, text: value });
  };

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const {
      target: { id },
    } = event;
    if (id == 'title') {
      setPost({ ...post, title: value });
    }
    if (id == 'tags') {
      setPost({ ...post, tags: value });
    }
  };
  const handleSubmit = async () => {
    try {
      const data = isEdit ? await editPost(id, post) : await addPost(post);
      navigate(`/posts/${isEdit ? id : data._id}`);
    } catch (error) {
      console.warn(error);
    }
  };

  if (!isAuth && !window.localStorage.getItem('token')) {
    navigate('/');
  }
  return (
    <Paper style={{ padding: 30 }}>
      <Button
        onClick={() => inputRef.current.click()}
        variant='outlined'
        size='large'
      >
        Загрузить превью
      </Button>
      <input ref={inputRef} type='file' onChange={handleChangeFile} hidden />
      {post.imageUrl && (
        <>
          <Button
            variant='contained'
            color='error'
            onClick={onClickRemoveImage}
          >
            Удалить
          </Button>
          <img
            className={styles.image}
            src={`http://localhost:4000${post.imageUrl}`}
            alt='Uploaded'
          />
        </>
      )}
      <br />
      <br />
      <TextField
        id='title'
        classes={{ root: styles.title }}
        variant='standard'
        placeholder='Заголовок статьи...'
        value={post.title}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        id='tags'
        classes={{ root: styles.tags }}
        variant='standard'
        placeholder='Теги'
        value={post.tags}
        onChange={handleChange}
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={post.text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button onClick={handleSubmit} size='large' variant='contained'>
          {isEdit ? 'Редактировать' : 'Опубликовать'}
        </Button>
        <Link to='/'>
          <Button size='large'>Отмена</Button>
        </Link>
      </div>
    </Paper>
  );
}
export default AddPost;
