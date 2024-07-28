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
   addTweet: (state, action) => {
     state.value = [action.payload, ...state.value];
   },
   removeTweet: (state, action) => {
    state.value = state.value.filter((tweet) => tweet._id !== action.payload)
   },
 },
});

export const { addTweet, removeTweet, getAllTweets } = tweetsSlice.actions;
export default tweetsSlice.reducer;