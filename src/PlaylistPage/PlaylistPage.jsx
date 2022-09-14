import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCollection, fetchCollectionTracks } from '../store/collectionSlice';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import "./PlaylistPage.scss";


const PlaylistPage = () => {

   const param = useParams();
   const { id } = param;

   const dispatch = useDispatch();
   const token = useSelector(state => state.login.token);
   const cover = useSelector(state => state.collection.image);
   const name = useSelector(state => state.collection.name);
   const totalAmount = useSelector(state => state.collection.totalAmount);
   const items = useSelector(state => state.collection.items);
   const description = useSelector(state => state.collection.description);
   const currentTrackId = useSelector(state => state.player.playbackState.id);
   const currentCollectionUri = useSelector(state => state.player.playbackState.context_uri);
   let totalTime = 0;


   function songDuration(duration) {
      var seconds = parseInt((duration / 1000) % 60),
         minutes = parseInt((duration / (1000 * 60)) % 60),
         hours = parseInt((duration / (1000 * 60 * 60)) % 24);

      hours = (hours < 10) ? "0" + hours : hours;
      minutes = (minutes < 10) ? "0" + minutes : minutes;
      seconds = (seconds < 10) ? "0" + seconds : seconds;

      // return `${minutes}.${seconds}`;
      return hours > 0 ? `${hours}.${minutes}.${seconds}` : `${minutes}.${seconds}`;
   };


   useEffect(() => {
      const url = `https://api.spotify.com/v1/me/player/play`;
      const uri = `spotify:playlist:${id.split(":").slice(-1)}`;
      
      if (uri !== currentCollectionUri) {
         dispatch(fetchCollection({ url, token, uri }));

      }

      dispatch(fetchCollectionTracks({ token, id }));
      

   }, [id]);


   const playlistItems = items.map((item, i) => {
      
      const { track } = item;      
      let artists = [];
      totalTime += track.duration_ms;

      const addedAt = item.added_at.split("T");
      const currentTrackClasses = `${track.id === currentTrackId ? "current" : ""}`;
   
      
      // function songDuration(duration) {
      //    var seconds = parseInt((duration / 1000) % 60),
      //       minutes = parseInt((duration / (1000 * 60)) % 60),
      //       hours = parseInt((duration / (1000 * 60 * 60)) % 24);

      //    hours = (hours < 10) ? "0" + hours : hours;
      //    minutes = (minutes < 10) ? "0" + minutes : minutes;
      //    seconds = (seconds < 10) ? "0" + seconds : seconds;

      //    // return `${minutes}.${seconds}`;
      //    return hours > 0 ? `${minutes}.${minutes}.${seconds}` : `${minutes}.${seconds}`;
      // }

      for (let i = 0; i < track.artists.length; i++) {
         artists.push(track.artists[i].name)
      }

      return (
         <li className={`playlist__item playlistitem ${!track.preview_url? "disabled" : ""}`} key={track.id}>
            <div className="playlistitem__number">{i+1}</div>
            <div className="playlistitem__name">
               <div className="playlistitem__cover">
                  <img src={track.album.images[2].url} alt="cover" />
               </div>
               <div className="playlistitem__ditails">
                  <div className={`playlistitem__song ${currentTrackClasses}`}>{track.name}</div>
                  <div className={`playlistitem__artists ${currentTrackClasses}`}>{artists.join(", ")}</div>
               </div>

            </div>
            <div className="playlistitem__album">{track.album.name}</div>
            <div className="playlistitem__date">{addedAt[0]}</div>
            <div className="playlistitem__duration">{songDuration(track.duration_ms)}</div>
         </li>
      );
   });

   
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