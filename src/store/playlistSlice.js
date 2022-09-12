import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchUserPlaylists = createAsyncThunk(
   'playlist/fetchUserPlaylists',
   async function (token, { rejectWithValue }) {      
      try {
         const response = await axios.get(
            `https://api.spotify.com/v1/me/playlists`, {
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': "application/json"
            }
         });
         if (!response.status === 200) {
            throw new Error('Error');
         }

         const { items } = await response.data;
         return items

      } catch (err) {
         return rejectWithValue(err.message);
      };
   }
);

export const fetchFollowedArtists = createAsyncThunk(
   'playlist/fetchFollowedArtists',
   async function (token, { rejectWithValue }) {      
      try {
         const response = await axios.get(
            'https://api.spotify.com/v1/me/following?type=artist', {
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': "application/json"
            }
         });
         if (!response.status === 200) {
            throw new Error('Error');
         }

         return response.data.artists.items

      } catch (err) {
         return rejectWithValue(err.message);
      };
   }
);

export const fetchTopArtists = createAsyncThunk(
   'playlist/fetchTopArtists',
   async function (token, { rejectWithValue }) {      
      try {
         const response = await axios.get(
            'https://api.spotify.com/v1/me/top/artists', {
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': "application/json"
            }
         });
         if (!response.status === 200) {
            throw new Error('Error');
         }
         
         return response.data.items

      } catch (err) {
         return rejectWithValue(err.message);
      };
   }
);

const playlistSlice = createSlice({
   name: 'playlist',
   initialState: {
      playlist: [],
      followedArtists: [],
      currentlyPlayingTrack: {},
      topArtists: [],
   },
   redusers: {
      fetchPlaylist(state, action) {
         state.playlist = action.payload;
      }
   },
   extraReducers: {
      [fetchUserPlaylists.fulfilled]: (state, action) => {
         state.playlist = action.payload;
      },
      [fetchFollowedArtists.fulfilled]: (state, action) => {
         state.followedArtists = action.payload;
      },
      [fetchTopArtists.fulfilled]: (state, action) => {  
         state.topArtists = action.payload;
      },
   },
});



export default playlistSlice.reducer;