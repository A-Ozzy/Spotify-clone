import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchArtist = createAsyncThunk(
   'artist/fetchArtist',
   async function ({ url, token, }, { rejectWithValue }) {     
      try {
         const response = await axios.get(url, {
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': "application/json"
            }
         });
         if (!response.status === 200) {
            console.log('ne ok');
            
         }
         const data = await response.data;        
         return data

      } catch (err) {
         return rejectWithValue(err.response.data.error);
      };
   }
);

export const fetchTopTracks = createAsyncThunk(
   'artist/fetchTopTracks',
   async function ({ url, token, }, { rejectWithValue }) {     
      try {
         const response = await axios.get(url, {
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': "application/json"
            }
         });
         if (!response.status === 200) {
            console.log('ne ok');
            
         }
         const data = await response.data.tracks;  
         return data

      } catch (err) {
         return rejectWithValue(err.response.data.error);
      };
   }
);


const artistSlice = createSlice({
   name: "artist",
   initialState: {
      // topTracks: [],
   },
   extraReducers: {
      [fetchArtist.fulfilled]: (state, action) => {
         // console.log(action.payload);
         state.artistInfo = {
            name: action.payload.name,
            followers: action.payload.followers.total,
            image: action.payload.images[0].url,
            // uri: action.payload.uri,
         }

      },
      [fetchTopTracks.fulfilled]: (state, action) => {
         // console.log(action.payload);
   
         const uris = action.payload.map((it) => it.uri, []);
         // console.log(uris);

         state.topTracks = action.payload;
         state.tracksUris = uris;
      },

   },
});

export default artistSlice.reducer;