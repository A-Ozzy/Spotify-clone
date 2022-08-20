import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchUserPlaylists = createAsyncThunk(
   'main/fetchUserPlaylists',
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
   'main/fetchFollowedArtists',
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

export const fetchCurrentlyPlayingTrack = createAsyncThunk(
   'main/fetchCurrentlyPlayingTrack',
   async function (token, { rejectWithValue }) {      
      try {
         const response = await axios.get(
            `https://api.spotify.com/v1/me/player/currently-playing`, {
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

export const fetchTopArtists = createAsyncThunk(
   'main/fetchTopArtists',
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
      [fetchCurrentlyPlayingTrack.fulfilled]: (state, action) => {   
         const { progress_ms } = action.payload;
         
         const { id, name, duration_ms, artists, album } = action.payload.item;
         
         state.currentlyPlayingTrack = {
            id,
            songName: name,
            artists: artists[0].name,
            songImg: album.images[2].url,
            duration: duration_ms,
            playingTrackPosition: progress_ms,
         };
      },
      [fetchTopArtists.fulfilled]: (state, action) => {  
         state.topArtists = action.payload;
      },
   },
});



export default playlistSlice.reducer;