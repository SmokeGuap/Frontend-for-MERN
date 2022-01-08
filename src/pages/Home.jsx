import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/index.js';
import { TagsBlock } from '../components/index.js';
import { CommentsBlock } from '../components/index.js';
import { useQuery } from 'react-query';
import { Alert } from '@mui/material';

function Home() {
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
  const {
    data: dataPosts,
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
  } = useQuery('posts', getPosts);
  const {
    data: dataTags,
    isLoading: isLoadingTags,
    isError: isErrorTags,
  } = useQuery('posts', getTags);

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
                    imageUrl='https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png'
                    user={item.author}
                    createdAt={item.createdAt}
                    viewsCount={item.viewCount}
                    commentsCount={3}
                    tags={item.tags}
                    isEditable
                  />
                )
              )}
            </Grid>
            <Grid xs={4} item>
              <TagsBlock items={dataTags?.items} isLoading={isLoadingTags} />
              <CommentsBlock
                items={[
                  {
                    user: {
                      fullName: 'Кирилл Горшков',
                      avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                    },
                    text: 'Это тестовый комментарий',
                  },
                  {
                    user: {
                      fullName: 'Иван Бочковский',
                      avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                    },
                    text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
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
