import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";
import playlistSlice from "./playlistSlice";
import playlerSlice from "./playerSlice";


export default configureStore({
   reducer: {
      login: loginSlice,
      playlist: playlistSlice,
      player: playlerSlice,
   },
});