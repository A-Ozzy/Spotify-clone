import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchCollection = createAsyncThunk(
   'collection/fetchCollection',
   async function ({ url, token, uri }, { rejectWithValue }) {      
      try {
         const response = await axios({
            method: "PUT",
            url,
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': "application/json"
            },
            data: {
               "context_uri": uri, 
               }
         });
         if (response.status === 204) {
            return true
         }

      } catch (err) {
         return rejectWithValue(err.response.data.error);
      };
   }
);

export const fetchCollectionTracks = createAsyncThunk(
   'collection/fetchCollectionTracks',
   async function ({ token, id }, { rejectWithValue }) {      
      try {
         const response = await axios.get(
            `https://api.spotify.com/v1/playlists/${id}`, {
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


const collectionSlice = createSlice({
   name: "collection",
   initialState: {
      isLoading: true,
      hasError: false,
      errorMessage: "",
      name: "",
      image: "",
      description: "",
      totalAmount: 0,
      items: [],
   },
   reducers: {
      
   },
   extraReducers: {
      [fetchCollectionTracks.fulfilled]: (state, action) => {
         state.isLoading = false;
         state.hasError = false;
         state.name = action.payload.name;
         state.image = action.payload.images[0].url;
         state.totalAmount = action.payload.tracks.total;
         state.items = action.payload.tracks.items;
         state.description = action.payload.description;
            
      },
      [fetchCollectionTracks.rejected]: (state, action) => {
         // console.log(action.payload);
         state.isLoading = false;
         state.hasError = true;
         state.errorMessage = action.payload;
      },
      
   },
});

export default collectionSlice.reducer;