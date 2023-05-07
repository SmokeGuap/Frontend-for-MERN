import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/index.js';
import { TagsBlock } from '../components/index.js';
import { CommentsBlock } from '../components/index.js';
import { useQuery } from 'react-query';
import { Alert, Box, Typography } from '@mui/material';
import { getPosts, getTags } from '../APIs/index.js';
import { UserContext } from '../App.jsx';
import { useContext, useState } from 'react';

function Home() {
  const [viewsFilter, setViewsFilter] = useState(0);
  const [tagsFilter, setTagsFilter] = useState('');
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

  const filterPostByViews = (arr) => {
    const sort = [...arr];
    sort.sort((a, b) => b.viewCount - a.viewCount);
    return sort;
  };
  const filterPostByTags = (arr, tag) => {
    if (tag == '') return arr;

    const sortedArr = arr.filter((item) => {
      for (let i = 0; i < item.tags.length; i++) {
        if (item.tags[i] == tag) {
          return true;
        }
      }
      return false;
    });
    return sortedArr;
  };
  return (
    <>
      {isErrorPosts ? (
        <Alert severity='error'>Ошибка соединения с сервером</Alert>
      ) : (
        <>
          <Box
            sx={{
              display: 'flex',
            }}
          >
            <Tabs style={{ marginBottom: 15 }} value={viewsFilter}>
              <Tab onClick={() => setViewsFilter(0)} label='Новые' />
              <Tab onClick={() => setViewsFilter(1)} label='Популярные' />
            </Tabs>
            <Typography variant='h4' color='primary'>
              #{tagsFilter}
            </Typography>
          </Box>
          <Grid container spacing={4}>
            <Grid xs={8} item>
              {(isLoadingPosts
                ? [...Array(5)]
                : viewsFilter
                ? filterPostByViews(filterPostByTags(dataPosts, tagsFilter))
                : filterPostByTags(dataPosts, tagsFilter)
              ).map((item, index) =>
                isLoadingPosts ? (
                  <Post key={index} isLoading={true} />
                ) : (
                  <Post
                    key={item._id}
                    id={item._id}
                    title={item.title}
                    imageUrl={
                      item.imageUrl
                        ? `http://localhost:4000${item.imageUrl}`
                        : ''
                    }
                    user={item.author}
                    createdAt={item.createdAt}
                    viewsCount={item.viewCount}
                    commentsCount={3}
                    tags={item.tags}
                    isEditable={user?._id == item.author._id}
                  />
                )
              )}
            </Grid>
            <Grid xs={4} item>
              {isErrorTags ? (
                <Alert severity='error'>Ошибка соединения с сервером</Alert>
              ) : (
                <TagsBlock
                  items={dataTags}
                  isLoading={isLoadingTags}
                  tagsFilter={setTagsFilter}
                />
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
