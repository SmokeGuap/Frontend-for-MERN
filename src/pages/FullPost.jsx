import { Post } from '../components/index.js';
import { AddComment } from '../components/index.js';
import { CommentsBlock } from '../components/index.js';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getPost } from '../APIs/index.js';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown.js';

function FullPost() {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery(['post', id], () =>
    getPost(id)
  );
  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }
  if (isError) {
    return <Alert severity='error'>Ошибка соединения с сервером</Alert>;
  }
  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4000${data.imageUrl}` : ''}
        user={data.author}
        createdAt={data.createdAt}
        viewsCount={data.viewCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: 'Вася Пупкин',
              avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
            },
            text: 'Это тестовый комментарий',
          },
          {
            user: {
              fullName: 'Иван Иванов',
              avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
            },
            text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
          },
        ]}
        isLoading={false}
      >
        <AddComment />
      </CommentsBlock>
    </>
  );
}
export default FullPost;
