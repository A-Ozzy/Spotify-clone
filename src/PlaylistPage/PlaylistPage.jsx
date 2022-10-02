import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCollection, fetchCollectionTracks } from '../store/collectionSlice';
import { togglePlay } from '../store/playerSlice';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { songDuration } from '../Util';
import PlayingIndicator from '../PlayingIndicator';
import Loader from '../Loader';
import Error from '../Error';

import "./PlaylistPage.scss";


const PlaylistPage = () => {

   const { id } = useParams();

   const dispatch = useDispatch();
   const token = useSelector(state => state.login.token);
   const cover = useSelector(state => state.collection.image);
   const { name, totalAmount, items, description,
          isLoading, hasError, errorMessage, } = useSelector(state => state.collection);
   const currentTrackId = useSelector(state => state.player.playbackState.id);
   const currentCollectionUri = useSelector(state => state.player.playbackState.context_uri);
   const [uri, setUri] = useState("");
   const [url, setUrl] = useState("");


   const setToPlay = (position) => {
      const data = {
         "context_uri": uri,
         "offset": {
            "position": position,
         },
      };

      dispatch(togglePlay({ url, token, data }));
   };

   useEffect(() => {
      setUrl(`https://api.spotify.com/v1/me/player/play`);
      setUri(`spotify:playlist:${id.split(":").slice(-1)}`);

      if (uri !== currentCollectionUri) {
         dispatch(fetchCollection({ url, token, uri }));

      }
      dispatch(fetchCollectionTracks({ token, id }));   
   }, [id, uri, url, currentCollectionUri, dispatch, token]);

   const totalTime = items?.reduce((acc, cur) => {      
      return acc += cur.track.duration_ms;
   }, 0);

   const playlistItems = items?.map((item, i) => {

      const { track } = item;
      let artists = [];
      const addedAt = item.added_at.split("T");
      const currentTrackClasses = `${track.id === currentTrackId ? "current" : ""}`;

      for (let i = 0; i < track.artists.length; i++) {
         artists.push(track.artists[i].name)
      }

      return (
         <li className={`playlist__item playlistitem ${!track.preview_url ? "disabled" : ""}`}
            key={track.id}
            onClick={() => setToPlay(i)}
         >
            <div className="playlistitem__number">{i + 1}</div>
            {track.id === currentTrackId? <PlayingIndicator/>: <div></div>}
            <div className="playlistitem__name">
               <div className="playlistitem__cover">
                  <img src={track.album.images[2].url} alt="cover" />
               </div>
               <div className="playlistitem__ditails">
                  <div className={`playlistitem__song ${currentTrackClasses}`}>{track.name}</div>
                  <div className={`playlistitem__artists ${currentTrackClasses}`}>{artists.join(", ")}</div>
               </div>

            </div>
            <div className="playlistitem__album">
               <Link to={`/${track.album.type}/${track.album.id}`} className="playlistitem__link">{name}</Link>
            </div>
            <div className="playlistitem__date">{addedAt[0]}</div>
            <div className="playlistitem__duration">{songDuration(track.duration_ms)}</div>
         </li>
      );
   });

   if (isLoading) {
      return <Loader/>
   }

   if (hasError) {
      return <Error errorMessage={ errorMessage } />
   }

   return (
      <div className='playlist'>
         <div className="playlist__header">
            <div className="playlist__cover">
               <img src={cover ?? ""} alt="playlist cover" />
            </div>
            <div className="playlist__info">
               <div className="playlist__type">плейлист</div>
               <div className="playlist__name">{name ?? ""}</div>
               <div className="playlist__description">{description}</div>
               <div className="playlist__summary">{`треков: ${totalAmount}, длительность ${songDuration(totalTime)}`}</div>
            </div>
         </div>
         <div className="playlist__container">
            <ul className="playlist__list">
               <li className="playlist__item playlistitem">
                  <div className="playlistitem__number">#</div>
                  <div className="playlistitem__number"></div>
                  <div className="playlistitem__name">NAME</div>
                  <div className="playlistitem__album">ALBUM</div>
                  <div className="playlistitem__date">ADDED AT</div>
                  <div className="playlistitem__duration"><AccessTimeIcon /></div>
               </li>
               <hr />
               {playlistItems}
            </ul>
         </div>
      </div>
   );
};

export default PlaylistPage;