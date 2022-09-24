import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAlbum = createAsyncThunk(
   'artist/fetchAlbum',
   async function ({ id, token, }, { rejectWithValue }) {     
      try {
         const response = await axios.get(
            `https://api.spotify.com/v1/albums/${id}`, {
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': "application/json"
            }
         });
         if (!response.status === 200) {
            throw new Error('Error');
            
         }
         const data = await response.data;  
         return data

      } catch (err) {
         return rejectWithValue(err.response.data.error);
      };
   }
);

const albumSlice = createSlice({
   name: "album",
   initialState: {
   },
   extraReducers: {
      [fetchAlbum.fulfilled]: (state, action) => {
         // console.log(action.payload);
         state.name = action.payload.name;
         state.image = action.payload.images[1].url;
         state.id = action.payload.id;
         state.release_date = action.payload.release_date;
         state.total_tracks = action.payload.total_tracks;
         state.tracks = action.payload.tracks.items;
         state.type = action.payload.type;
         state.artist = action.payload.artists[0].name;
         

      },
      
   },
});

export default albumSlice.reducer;