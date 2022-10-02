import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlayingIndicator from '../PlayingIndicator';
import { fetchAlbum } from '../store/albumSlice';
import { togglePlay } from '../store/playerSlice';
import { songDuration } from "../Util";

import "./AlbumPage.scss";


const AlbumPage = () => {

   const { id } = useParams();
   const dispatch = useDispatch();
   const currentTrackId = useSelector(state => state.player.playbackState.id);
   const token = useSelector(state => state.login.token);
   const { uri, tracks, total_tracks, artist,
            release_date, name, type, image, 
   } = useSelector(state => state.album);


   useEffect(() => {
      
      dispatch(fetchAlbum({ id, token }));
   }, [id]);

   const setToPlay = (position) => {
      const url = "https://api.spotify.com/v1/me/player/play";
      const data = {
         "context_uri": uri,
         "offset": {
            "position": position,
         },
      };

      dispatch(togglePlay({ url, token, data }));
   };

   const totalDuration = useMemo(() => {
      return tracks?.reduce((acc, cur) => {
         return acc + cur.duration_ms;
      }, 0);
   }, [tracks]);

   const albumItems = tracks?.map((val, i) => {

      const currentTrackClasses = `${val.id === currentTrackId ? "current" : ""}`;
      return (
         <li className="albumcollection__item" id={val.id} key={val.id}
         onClick={()=>{setToPlay(i)}}>
            <div className="albumcollection__number">{i + 1}</div>
            {val.id === currentTrackId ? <PlayingIndicator /> : <div></div>}
            <div className="albumcollection__info">
               <div className={`albumcollection__name ${currentTrackClasses}`}>{ val.name}</div>
               <div className={`albumcollection__artist ${currentTrackClasses}`}>{ val.artists[0].name}</div>
            </div>
            <div className="albumcollection__diration">{ songDuration(val.duration_ms)}</div>
         </li>

      );
   });



   return (
      <div className="album">
         <div className="album__header">
            <div className="album__img">
               <img src={image} alt="cover" />
            </div>
            <div className="album__container">
               <div className="album__type">{type}</div>
               <div className="album__name">{name}</div>
               <div className="album__info">
                  <span className="album-artist">{artist}</span>
                  <span className="release">{release_date?.split("-")[0]}</span>
                  <span className="totat-tracks">{total_tracks} треков</span>
                  <span className="duration">{songDuration(totalDuration)} sec</span>
               </div>
            </div>
         </div>
         <div className="album__collection albumcollection">
            <ul className="albumcollection__list">
               <li className="albumcollection__item">
                  <div className="albumcollectionn__number">#</div>
                  <div className="albumcollection__number"></div>
                  <div className="albumcollection__name">NAME</div>
                  <div className="albumcollection__duration"><AccessTimeIcon /></div>
               </li>
               <hr />
               {albumItems}
            </ul>
         </div>
      </div>
   );
}

export default AlbumPage;