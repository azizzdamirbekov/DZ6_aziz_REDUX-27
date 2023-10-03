import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../store/PostsSlice";
import Post from "../../components/Post";
import PostSpinner from "../../components/PostSpinner";

function PostPage() {
  const dispatch = useDispatch();
  const {posts, preloader, message} = useSelector(state => state.postsReducer)

  const getPostFunction = () => {
    dispatch(getPosts())
  }

  useEffect(() => {
    getPostFunction()
  }, [])
  return (
    <div>
      <button>get post</button>
      <button>delete all</button>
      {preloader ? <PostSpinner /> : message ? <h3>{message} </h3> : posts.map(post => <Post key={post.id} postInfo={post}/>)}
    </div>
  );
}

export default PostPage;
