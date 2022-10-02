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
         return rejectWithValue(err.response.data.error.message);
      };
   }
);

export const fetchRelatedArtists = createAsyncThunk(
   'artist/fetchRelatedArtists',
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
         const data = await response.data.artists;
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

export const fetchArtistAlbums = createAsyncThunk(
   'artist/fetchArtistAlbums',
   async function ({ id, token, }, { rejectWithValue }) {
      try {
         const response = await axios.get(
            `https://api.spotify.com/v1/artists/${id}/albums?include_groups=album`, {
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': "application/json"
            }
         });
         if (!response.status === 200) {
            throw new Error('Error');

         }
         const data = await response.data.items;
         return data

      } catch (err) {
         return rejectWithValue(err.response.data.error);
      };
   }
);

const artistSlice = createSlice({
   name: "artist",
   initialState: {
      isLoading: true,
      hasError: false,
      errorMessage: "",

   },
   extraReducers: {
      [fetchArtist.fulfilled]: (state, action) => {
         state.isLoading = false;
         state.hasError = false;
         state.artistInfo = {
            name: action.payload.name,
            followers: action.payload.followers.total,
            image: action.payload.images[0].url,
            uri: action.payload.uri,
            id: action.payload.id,
         }
      },
      [fetchArtist.rejected]: (state, action) => {
         state.isLoading = false;
         state.hasError = true;
         state.errorMessage = action.payload;
      },
      [fetchTopTracks.fulfilled]: (state, action) => {
         state.topTracks = action.payload;
      },
      [fetchRelatedArtists.fulfilled]: (state, action) => {
         state.related = action.payload;
      },
      [fetchArtistAlbums.fulfilled]: (state, action) => {
         state.albums = action.payload;
      },

   },
});

export default artistSlice.reducer;