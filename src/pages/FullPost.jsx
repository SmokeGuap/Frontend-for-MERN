import { Post } from '../components/index.js';
import { AddComment } from '../components/index.js';
import { CommentsBlock } from '../components/index.js';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getCommentsByPost, getPost } from '../APIs/index.js';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown.js';
import { Alert } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from '../App.jsx';

function FullPost() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const {
    data: dataPost,
    isLoading: isLoadingPost,
    isError: isErrorPost,
  } = useQuery(['post', id], () => getPost(id));
  const {
    data: dataComments,
    isLoading: isLoadingComments,
    isError: isErrorComments,
  } = useQuery(['comment', id], () => getCommentsByPost(id));

  if (isLoadingPost) {
    return <Post isLoading={isLoadingPost} isFullPost />;
  }
  if (isErrorPost) {
    return <Alert severity='error'>Ошибка соединения с сервером</Alert>;
  }

  return (
    <>
      <Post
        id={dataPost._id}
        title={dataPost.title}
        imageUrl={
          dataPost.imageUrl ? `http://localhost:4000${dataPost.imageUrl}` : ''
        }
        user={dataPost.author}
        createdAt={dataPost.createdAt}
        viewsCount={dataPost.viewCount}
        commentsCount={dataComments?.length}
        tags={dataPost.tags}
        isFullPost
      >
        <ReactMarkdown children={dataPost.text} />
      </Post>
      {isErrorComments ? (
        <Alert severity='error'>Ошибка соединения с сервером</Alert>
      ) : (
        <CommentsBlock
          me={user}
          items={dataComments}
          isLoading={isLoadingComments}
        >
          {user && <AddComment me={user} />}
        </CommentsBlock>
      )}
    </>
  );
}
export default FullPost;
