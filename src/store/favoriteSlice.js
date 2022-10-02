import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchFavoriteTracks = createAsyncThunk(
   'playlist/fetchFavoriteTracks',
   async function (token, { rejectWithValue }) {      
      try {
         const response = await axios.get(
            'https://api.spotify.com/v1/me/tracks', {
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': "application/json"
            }
         });
         if (!response.status === 200) {
            throw new Error('Error');
         }
         
         return response.data.items;

      } catch (err) {
         return rejectWithValue(err.message);
      };
   }
);

const favoriteSlice = createSlice({
   name: 'favorite',
   initialState: {
      tracks: [],
      hasError: false,
      errorMessage: "",
   },
   redusers: {
   },
   extraReducers: {
      [fetchFavoriteTracks.fulfilled]: (state, action) => {
         state.tracks = action.payload;
         state.hasError = false;
      },
      [fetchFavoriteTracks.rejected]: (state, action) => { 
         state.hasError = true;
         state.errorMessage = action.payload;
      },
      
   },
});



export default favoriteSlice.reducer;