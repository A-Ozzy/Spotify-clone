import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchUserInfo = createAsyncThunk(
   'main/fetchUserInfo',
   async function (token, { rejectWithValue }) {      
      try {
         const response = await axios.get(
            `https://api.spotify.com/v1/me`, {
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


const loginSlice = createSlice({
   name: "login",
   initialState: {
      token: null, 
      isLogged: false,
      hasError: false,
      errorMessage: "",
      isLoading: false,
      userName: "",
      userAvatar: "",
   },
   reducers: {
      hasToken(state, action) {
         state.hasError = false;
         state.token = action.payload;
      },
      isLogged(state, action) {
         state.hasError = false;
         state.isLogged = action.payload;
      },
   },
   extraReducers: {
      [fetchUserInfo.fulfilled]: (state, action) => {
         state.userName = action.payload.display_name;
         state.userAvatar = action.payload.images[0].url;
      },
      [fetchUserInfo.rejected]: (state, action) => {         
         state.hasError = true;
         state.errorMessage = action.payload;
      },
      
   },
});


export const { hasToken, isLogged } = loginSlice.actions;


export default loginSlice.reducer;