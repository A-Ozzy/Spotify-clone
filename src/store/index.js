import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";
import playlistSlice from "./playlistSlice";
import playlerSlice from "./playerSlice";
import collectionSlice from "./collectionSlice";
import artistSlice from "./artistSlice";


export default configureStore({
   reducer: {
      login: loginSlice,
      playlist: playlistSlice,
      player: playlerSlice,
      collection: collectionSlice,
      artist: artistSlice,
   },
});