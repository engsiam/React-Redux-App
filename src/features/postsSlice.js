import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
  searchQuery: "",
};
//show all post only 20
export const fetchPosts = createAsyncThunk("posts/fetchPosts/limit", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts?_limit=12"
  );
  return response.data;
});
//add post
export const addPost = createAsyncThunk("posts/addpost", async (post) => {
  const response = await axios.post(
    "https://jsonplaceholder.typicode.com/posts",
    post
  );
  return response.data;
});

//delete post
export const deletePost = createAsyncThunk("posts/deletepost", async (id) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return id; // Return the ID of the deleted post
});

//update post
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      });
      
  },
});

export const { setSearchQuery } = postsSlice.actions;
// Selectors - This is how we pull information from the store state 
export const selectFilteredPosts = (state) => {
  const { searchQuery, posts } = state.posts;
  if (!searchQuery) {
    return posts;
  }
  return posts.filter((post) => post.title.includes(searchQuery));
};

export default postsSlice.reducer;
