import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: [],
};

export const tweetsSlice = createSlice({
 name: 'tweets',

  initialState,
 reducers: {
    getAllTweets: (state, action) => {
        state.value = action.payload;
    },
    getAllTrendTweets: (state, action) => {
      state.value = action.payload;
    },
   addTweet: (state, action) => {
     state.value = [action.payload, ...state.value];
   },
   removeTweet: (state, action) => {
    state.value = state.value.filter((tweet) => tweet._id !== action.payload)
   },
   addLike: (state, action) => {
    for (let tweet of state.value) {
      if (tweet._id === action.payload._id) {
        tweet.likedBy.push(action.payload.token)
      }
    }
   },
   removeLike: (state, action) => {
    for (let tweet of state.value) {
      if (tweet._id === action.payload._id) {
        tweet.likedBy = tweet.likedBy.filter((e) => e !== action.payload.token)
      }
    }
   },
 },
});

export const { addTweet, removeTweet, getAllTweets, addLike, removeLike, getAllTrendTweets } = tweetsSlice.actions;
export default tweetsSlice.reducer;