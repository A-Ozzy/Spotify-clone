import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { fetchArtist, fetchRelatedArtists, fetchTopTracks, fetchArtistAlbums } from '../store/artistSlice';
import VerifiedIcon from '@mui/icons-material/Verified';
import ItemList from '../ItemList';
import BoxItems from '../BoxItems';

import './ArtistPage.scss';




const ArtistPage = () => {

   const dispatch = useDispatch();
   const token = useSelector(state => state.login.token);
   const { id } = useParams();
   const artistInfo = useSelector(state => state.artist.artistInfo);
   const artistAlbums = useSelector(state => state.artist.albums);
   const related = useSelector(state => state.artist.related);
   const topTracks = useSelector(state => state.artist.topTracks);
   const [url, setUrl] = useState("");

   useEffect(() => {
      setUrl(`https://api.spotify.com/v1/artists/${id}`);

      if (url !== "") {
         dispatch(fetchArtist({ url, token }));
         dispatch(fetchRelatedArtists({ url: `https://api.spotify.com/v1/artists/${id}/related-artists`, token }));
      }
   }, [id, url]);

   useEffect(() => {
      dispatch(fetchTopTracks({ url: `https://api.spotify.com/v1/artists/${id}/top-tracks?market=ES`, token }));
   
   }, [id]);

   useEffect(() => {
      if (artistInfo?.id) {
         const { id } = artistInfo;
         dispatch(fetchArtistAlbums({ id, token }));
      }
   }, [artistInfo]);

   const formattedNum = (num) => {
      const form = num?.toString().split(/(?=(?:\d{3})+$)/).join(" ");
      const ej = ["0", "5", "6", "7", "8", "9"];
      const ja = ["2", "3", "4",];
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
            <div className="artist__sublabel"><VerifiedIcon color="success" /> <span>Подтвержденный исполнитель</span></div>
            <div className="artist__name">{artistInfo?.name}</div>
            <div className="artist__subscribers">{`${formattedNum(artistInfo?.followers)} за месяц`}</div>
         </div>
         <ItemList items={topTracks} url={"https://api.spotify.com/v1/me/player/play"} title={"Популярные треки"} />
         <BoxItems data={artistAlbums} title={"Альбомы"} />
         {related && related.length > 0 ? <BoxItems data={related} title={"Похожие"}/> : null}
      </div>
   );
};

export default ArtistPage;