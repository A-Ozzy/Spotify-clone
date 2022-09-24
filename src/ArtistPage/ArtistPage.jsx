import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { fetchArtist, fetchTopTracks, fetchArtistAlbums } from '../store/artistSlice';
import VerifiedIcon from '@mui/icons-material/Verified';
import PlayingIndicator from '../PlayingIndicator';
import BoxItems from '../BoxItems';
import { songDuration } from '../Util';
import { togglePlay } from '../store/playerSlice';

import './ArtistPage.scss';




const ArtistPage = () => {

   const dispatch = useDispatch();
   const token = useSelector(state => state.login.token);
   const { id } = useParams();
   const artistInfo = useSelector(state => state.artist.artistInfo);
   const artistAlbums = useSelector(state => state.artist.albums);
   const tracksUris = useSelector(state => state.artist.tracksUris);
   const topTracks = useSelector(state => state.artist.topTracks);
   const currentTrackId = useSelector(state => state.player.playbackState.id);
   const [url, setUrl] = useState("");

   useEffect(() => {
      setUrl(`https://api.spotify.com/v1/artists/${id}`);

      if (url !== "") {
         dispatch(fetchArtist({ url, token }));
      }

      // dispatch(fetchTopTracks({ url: `https://api.spotify.com/v1/artists/${id}/top-tracks?market=ES`, token }));

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

   const setToPlay = (position) => {
      const data = {
         "uris": tracksUris,
         "offset": {
            "position": position,
         },
      };
      dispatch(togglePlay({ url: "https://api.spotify.com/v1/me/player/play", token, data }));
   };

   const trackList = topTracks?.map((item, i) => {
      // console.log(item);
      const { images, name } = item.album;

      return (
         <li className='artist__trackitem trackitem' key={item.id}
            onClick={() => setToPlay(i)}>
            <div className="trackitem__number">{i + 1}</div>
            <div className="trackitem__wiget">
               {item.id === currentTrackId ? <PlayingIndicator /> : <div></div>}
            </div>
            <div className="trackitem__ditails">
               <div className="trackitem__cover">
                  <img src={images[2].url ?? ""} alt="cover" />
               </div>
               <div className={`trackitem__name ${item.id === currentTrackId ? "current" : ""}`}>{item.name}</div>
            </div>
            <div className="trackitem__album">{name}</div>
            <div className="trackitem__duration">{songDuration(item.duration_ms)}</div>
         </li>
      )
   });


   return (
      <div className='artist'
         style={{ background: `url('${artistInfo?.image}') center 0 / auto 21.25rem no-repeat` ?? "" }}>
         <div className="artist__header" >
            <div className="artist__sublabel"><VerifiedIcon color="success" /> <span>Подтвержденный исполнитель</span></div>
            <div className="artist__name">{artistInfo?.name}</div>
            <div className="artist__subscribers">{`${formattedNum(artistInfo?.followers)} за месяц`}</div>
         </div>
         <div className="artist__title">Популярные треки</div>
         <ul className="artist__tracklist">
            {trackList ?? null}
         </ul>
         <BoxItems data={artistAlbums} title={ "Альбомы"}/>
      </div>
   );
};

export default ArtistPage;