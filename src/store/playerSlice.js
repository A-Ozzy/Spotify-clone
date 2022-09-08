import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const switchDevice = createAsyncThunk(
   'player/switchDevice',
   async function ({ device_id, token }, { rejectWithValue }) {

      try {
         const response = await axios({
            method: "PUT",
            url: "https://api.spotify.com/v1/me/player",
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': "application/json"
            },
            data: {
               "device_ids": [device_id],
               play: false,
            }
         });
         if (response.status === 204) {
            return true
         } else {
            return response.status
         }


      } catch (err) {
         return rejectWithValue(err.response);
      };
   }
);

export const fetchPlaybackState = createAsyncThunk(
   'player/fetchPlaybackState',
   async function (token, { rejectWithValue }) {
      try {
         const response = await axios.get(
            'https://api.spotify.com/v1/me/player', {
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': "application/json"
            }
         });
         if (!response.status === 200) {
            throw new Error('Error');
         }

         // console.log(response.data);

         return response.data

      } catch (err) {
         return rejectWithValue(err.message);
      };
   }
);

export const togglePlay = createAsyncThunk(
   'player/togglePlay',
   async function ({ url, token }, { rejectWithValue }) {

      try {
         const response = await axios({
            method: "PUT",
            url,
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': "application/json"
            },
         });
         if (response.status === 204) {
            return true
         }

      } catch (err) {
         return rejectWithValue(err.response.data.error);
      };
   }
);

export const switchToNextPrevious = createAsyncThunk(
   'player/switchToNextPrevious',
   async function ({ url, token }, { rejectWithValue }) {

      try {
         const response = await axios({
            method: "POST",
            url,
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': "application/json"
            },
         });
         if (response.status === 204) {
            return true
         } else {
            return response.status
         }


      } catch (err) {
         return rejectWithValue(err.response);
      };
   }
);

export const toggleShuffle = createAsyncThunk(
   'player/toggleShuffle',
   async function ({ action, token }, { rejectWithValue }) {

      try {
         const response = await axios({  /// 
            method: "PUT",
            url: `https://api.spotify.com/v1/me/player/shuffle?state=${action}`,
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': "application/json"
            },

         });
         if (response.status === 204) {
            return true
         } else {
            return response.status
         }


      } catch (err) {
         return rejectWithValue(err.response);
      };
   }
);

export const toggleRepeat = createAsyncThunk(
   'player/toggleRepeat',
   async function ({ action, token }, { rejectWithValue }) {

      try {
         
         const response = await axios({ 
            method: "PUT",  
            url: `https://api.spotify.com/v1/me/player/repeat?state=${action}`,
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': "application/json"
            }

         });
         if (response.status === 204) {
            return true
         } else {
            return response.data
         }


      } catch (err) {
         return rejectWithValue(err.response);
      };
   }
);

const playerSlice = createSlice({
   name: 'player',
   initialState: {
      playbackState: {},
   },
   reducers: {
      setPlaybackState(state, action) {
         state.playbackState = { ...action.payload };
      },

   },
   extraReducers: {

      [togglePlay.fulfilled]: (state, action) => {
         if (action.payload) {
            state.playbackState.play = !state.playbackState.play
         }

      },
      [togglePlay.rejected]: (state, action) => {
     
      },
      [switchToNextPrevious.fulfilled]: (state, action) => {

      },
      [switchToNextPrevious.rejected]: (state, action) => {
         // console.log(action.payload);
      },
      [toggleShuffle.rejected]: (state, action) => {
         // console.log(action.payload);
      },
      [toggleRepeat.fulfilled]: (state, action) => {
         // console.log(action.payload);
      },
   },
});

export const { setPlaybackState } = playerSlice.actions;

export default playerSlice.reducer;