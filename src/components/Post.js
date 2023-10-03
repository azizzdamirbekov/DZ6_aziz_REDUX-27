import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMoreInfo } from '../store/PostsSlice';


function Post({ postInfo }) {
  const dispatch = useDispatch();

  const moreInfo = useSelector(state => state.postsReducer.moreInfo);
  const handleMoreInfoClick = () => {
    dispatch(fetchMoreInfo(postInfo.id));
  };

  return (
    <>
      <h1>{postInfo.title}</h1>
      <button onClick={handleMoreInfoClick}>more Info</button>
      {postInfo.id === moreInfo?.id && (
        <>
          <p>{moreInfo.body}</p>
        </>
      )}
      <p>======================</p>
    </>
  );
}

export default Post;