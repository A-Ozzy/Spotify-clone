import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const onSearch = createAsyncThunk(
   'main/onSearch',
   async function ({ value, token }, { rejectWithValue }) {
      try {
         const response = await axios.get(
            `https://api.spotify.com/v1/search?q=${value}&type=album,track,artist&include_external=audio&limit=10`, {
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': "application/json"
            }
         });
         if (!response.status === 200) {
            throw new Error('Error');
         }

         return response.data

      } catch (err) {
         return rejectWithValue(err.message);
      };
   }
);


const searchSlice = createSlice({
   name: "search",
   initialState: {
      hasError: false,
      isLoading: false,
   },
   reducers: {
      removeAll(state, action) {
         state.hasError = false;
         state.isLoading = false;
         state.albums = [];
         state.artists = [];
         state.tracks = [];
      },
   },
   extraReducers: {
      [onSearch.pending]: (state, action) => {
         // console.log(action.payload);

         state.isLoading = true;
         state.hasError = false;
      },
      [onSearch.fulfilled]: (state, action) => {
         console.log(action.payload);
         state.isLoading = false;
         state.albums = action.payload.albums.items;
         state.artists = action.payload.artists.items;
         state.tracks = action.payload.tracks.items;
      },
      [onSearch.rejected]: (state, action) => {
         // console.log(action.payload);

         state.isLoading = false;
         state.hasError = true;
      },
   },
});


export const { removeAll } = searchSlice.actions;

export default searchSlice.reducer;