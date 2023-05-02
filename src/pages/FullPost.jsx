import { Post } from '../components/index.js';
import { AddComment } from '../components/index.js';
import { CommentsBlock } from '../components/index.js';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

function FullPost() {
  const { id } = useParams();

  async function getPost() {
    const res = await fetch(`http://localhost:4000/posts/${id}`);
    const data = await res.json();
    return data;
  }
  const { data, isLoading, isError } = useQuery('post', getPost);
  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }
  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl='https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png'
        user={data.author}
        createdAt={data.createdAt}
        viewsCount={data.viewCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <p>{data.text}</p>
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
