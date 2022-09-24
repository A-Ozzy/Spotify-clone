import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAlbum } from '../store/albumSlice';
import { songDuration } from "../Util";

import "./AlbumPage.scss";


const AlbumPage = () => {

   const { id } = useParams();
   const dispatch = useDispatch();
   const token = useSelector(state => state.login.token);
   const image = useSelector(state => state.album.image);
   const type = useSelector(state => state.album.type);
   const name = useSelector(state => state.album.name);
   const release_date = useSelector(state => state.album.release_date);
   const artist = useSelector(state => state.album.artist);
   const total_tracks = useSelector(state => state.album.total_tracks);
   const tracks = useSelector(state => state.album.tracks);

   // console.log(id);
   
   useEffect(() => {
      
      dispatch(fetchAlbum({ id, token }));
   }, [id]);

   // 
   
   const totalDuration = useMemo(() => {
      return tracks?.reduce((acc, cur) => {         
         return acc + cur.duration_ms;
      }, 0);
   }, [tracks]);

console.log(totalDuration);

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
      </div>
   );
}

export default AlbumPage;