import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/index.js';
import { TagsBlock } from '../components/index.js';
import { CommentsBlock } from '../components/index.js';
import { useQuery } from 'react-query';
import { Alert } from '@mui/material';
import { getPosts, getTags } from '../APIs/index.js';
import { useSelector } from 'react-redux';
import { UserContext } from '../App.jsx';
import { useContext } from 'react';

function Home() {
  const {
    data: dataPosts,
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
  } = useQuery('posts', getPosts);
  const {
    data: dataTags,
    isLoading: isLoadingTags,
    isError: isErrorTags,
  } = useQuery('tags', getTags);
  const { user } = useContext(UserContext);
  return (
    <>
      {isErrorPosts ? (
        <Alert severity='error'>Ошибка соединения с сервером</Alert>
      ) : (
        <>
          <Tabs
            style={{ marginBottom: 15 }}
            value={0}
            aria-label='basic tabs example'
          >
            <Tab label='Новые' />
            <Tab label='Популярные' />
          </Tabs>
          <Grid container spacing={4}>
            <Grid xs={8} item>
              {(isLoadingPosts ? [...Array(5)] : dataPosts).map((item, index) =>
                isLoadingPosts ? (
                  <Post key={index} isLoading={true} />
                ) : (
                  <Post
                    key={item._id}
                    id={item._id}
                    title={item.title}
                    imageUrl={`http://localhost:4000${item.imageUrl}`}
                    user={item.author}
                    createdAt={item.createdAt}
                    viewsCount={item.viewCount}
                    commentsCount={3}
                    tags={item.tags}
                    isEditable={user?._id == item.author}
                  />
                )
              )}
            </Grid>
            <Grid xs={4} item>
              {isErrorTags ? (
                <Alert severity='error'>Ошибка соединения с сервером</Alert>
              ) : (
                <TagsBlock items={dataTags} isLoading={isLoadingTags} />
              )}
              <CommentsBlock
                items={[
                  {
                    user: {
                      fullName: 'Кирилл Горшков',
                      avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                    },
                    text: 'Im gay)',
                  },
                  {
                    user: {
                      fullName: 'Иван Бочковский',
                      avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                    },
                    text: 'me too',
                  },
                ]}
                isLoading={false}
              />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}
export default Home;
