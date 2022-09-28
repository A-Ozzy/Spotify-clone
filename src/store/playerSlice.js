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
         if (response.status === 202) {
            return response.status
         } else {
            return response.status
         }


      } catch (err) {
         return rejectWithValue(err.response.config);
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

         return response.data

      } catch (err) {
         return rejectWithValue(err.message);
      };
   }
);

export const togglePlay = createAsyncThunk(
   'player/togglePlay',
   async function ({ url, token, data = {} }, { rejectWithValue }) {
      
      try {
         const response = await axios({
            method: "PUT",
            url,
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': "application/json"
            },
            data,

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
            // console.log(response.status);

            return true
         } else {
            // console.log(response);

            return response.data
         }


      } catch (err) {
         return rejectWithValue(err.response);
      };
   }
);

export const setPlaybackVolume = createAsyncThunk(
   'player/setPlaybackVolume',
   async function ({ defaultVolume, token }, { rejectWithValue }) {

      try {

         const response = await axios({
            method: "PUT",
            url: `https://api.spotify.com/v1/me/player/volume?volume_percent=${defaultVolume}`,
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': "application/json"
            }

         });
         if (response.status === 204) {
            return true
         }

      } catch (err) {
         return rejectWithValue(err.response.data.error.message);
      };
   }
);

const playerSlice = createSlice({
   name: 'player',
   initialState: {
      playbackState: {},
      deviceId: '',
   },
   reducers: {
      setPlaybackState(state, action) {
         state.playbackState = { ...action.payload };
      },
      setDeviceId(state, action) {
         state.deviceId = action.payload;
      },

   },
   extraReducers: {

      [togglePlay.fulfilled]: (state, action) => {
      },
      [togglePlay.rejected]: (state, action) => {
         // console.log(" play rej: ", action.payload);
      },
      [switchDevice.fulfilled]: (state, action) => {
         // console.log("device switced", action.payload);
      },
      [switchDevice.rejected]: (state, action) => {
         console.log("switching rejected", action.payload);
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
      [setPlaybackVolume.fulfilled]: (state, action) => {
         // console.log("volume is set");
      },
      [setPlaybackVolume.rejected]: (state, action) => {
         console.log("rejected => ", action.payload);
      },
   },
});

export const { setPlaybackState, setDeviceId } = playerSlice.actions;

export default playerSlice.reducer;