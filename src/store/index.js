import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";
import playlistSlice from "./playlistSlice";


export default configureStore({
   reducer: {
      login: loginSlice,
      playlist: playlistSlice,
   },
});