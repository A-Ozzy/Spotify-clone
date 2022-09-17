import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { fetchCollection, fetchCollectionTracks } from '../store/collectionSlice';
import { fetchArtist, fetchTopTracks } from '../store/artistSlice';
import VerifiedIcon from '@mui/icons-material/Verified';
import { togglePlay } from '../store/playerSlice';

import './ArtistPage.scss';



const ArtistPage = () => {

   const dispatch = useDispatch();
   const token = useSelector(state => state.login.token);
   const { id } = useParams();
   const artistInfo = useSelector(state => state.artist.artistInfo);


   useEffect(() => {
      const url = `https://api.spotify.com/v1/artists/${id}`;
      dispatch(fetchArtist({ url, token }));
      dispatch(fetchTopTracks({ url: `https://api.spotify.com/v1/artists/${id}/top-tracks`, token }));

   }, [id]);

   const formattedNum = (num) => {
      const form = num?.toString().split(/(?=(?:\d{3})+$)/).join(" ");
      const ej = ["0", "5", "6", "7", "8", "9"];
      const ja = ["2", "3", "4", ];
      if (ej.includes(form?.slice(-1))) {
         return `${form} слушателей` 
      }
      if (ja.includes(form?.slice(-1))) {
         return `${form} слушателя` 
      } else {
         return `${form} слушатель`
      }
      
   };
   

   return (
      <div className='artist'
         style={{ background: `url('${artistInfo?.image}') center 0 / auto 21.25rem no-repeat` ?? "" }}>
         <div className="artist__header" >
            <div className="artist__sublabel"><VerifiedIcon color="success"/> <span>Подтвержденный исполнитель</span></div>
            <div className="artist__name">{artistInfo?.name}</div>
            <div className="artist__subscribers">{`${formattedNum(artistInfo?.followers)} за месяц`}</div>
         </div>
         
      </div>
   );
};

export default ArtistPage;