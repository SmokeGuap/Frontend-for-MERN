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
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import { addPost, editPost, getPost, upload } from '../../APIs';

function AddPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuth } = useContext(UserContext);
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [text, setText] = useState('');
  const inputRef = useRef(null);
  const isEdit = Boolean(id);

  useEffect(() => {
    try {
      if (id) {
        getPost(id).then((data) => {
          setImageUrl(data.imageUrl);
          setTitle(data.title);
          setTags(data.tags.join(','));
          setText(data.text);
        });
      } else {
        setImageUrl('');
        setTitle('');
        setTags('');
        setText('');
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
      setImageUrl(data.url);
    } catch (error) {
      console.warn(error);
      alert('Ошибка загрузки файла');
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  const onChange = useCallback((value) => {
    setText(value);
  }, []);

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
  const handleSubmit = async () => {
    try {
      const fields = {
        title,
        text,
        imageUrl,
        tags,
      };

      const data = isEdit ? await editPost(id, fields) : await addPost(fields);
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
      {imageUrl && (
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
            src={`http://localhost:4000${imageUrl}`}
            alt='Uploaded'
          />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant='standard'
        placeholder='Заголовок статьи...'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant='standard'
        placeholder='Теги'
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button onClick={handleSubmit} size='large' variant='contained'>
          {isEdit ? 'Редактировать' : 'Опубликовать'}
        </Button>
        <a href='/'>
          <Button size='large'>Отмена</Button>
        </a>
      </div>
    </Paper>
  );
}
export default AddPost;
