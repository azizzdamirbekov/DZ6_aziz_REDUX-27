import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getPosts = createAsyncThunk(
  "getPosts",
  async function (info, { dispatch }) {
    try {
        dispatch(preloaderOn())
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    
        if (response.status === 200)  {
            const posts = await response.json();
            dispatch(postsInfo(posts));
            dispatch(preloaderOff())
        }
    }
    catch (e) {
        dispatch(setMessage(e))
    } finally {
        dispatch(preloaderOff())
    }
  }
);

export const createPost = createAsyncThunk (
    'createPost',
    async function(info, {dispatch}) {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(info)
            }
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', options )

            if(response.status >= 200 && response.status <= 204) {
                dispatch(setMessage('post created'))
            }else if(response.status === 404) {
                setMessage('Error')
            }
        } catch (e) {
            dispatch(setMessage(e))
        } finally {
            dispatch(preloaderOff())
        }
    }
)

export const fetchMoreInfo = createAsyncThunk(
    "fetchMoreInfo",
    async function (postId, { dispatch }) {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      const additionalInfo = await response.json();
      dispatch(moreInfo(additionalInfo));
    }
  );

const postsSlice = createSlice({
  name: "postsSlice",
  initialState: {
    posts: [],
    preloader: false,
    message: "",
    moreInfo: null
  },
  reducers: {
    postsInfo: (state, action) => {
      state.posts = action.payload;
    },
    preloaderOn: (state, action) => {
      state.preloader = true;
    },
    preloaderOff: (state, action) => {
      state.preloader = false;
    },
    setMessage: (state, action) => {
        state.message = action.payload
    },
    moreInfo: (state, action) => {
        state.moreInfo = action.payload
    }
  },
});

export const { postsInfo, moreInfo, setMessage, preloaderOff, preloaderOn } = postsSlice.actions;

export default postsSlice.reducer;
