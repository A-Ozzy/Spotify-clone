import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlayingIndicator from '../PlayingIndicator';
import { togglePlay } from '../store/playerSlice';
import { songDuration } from '../Util';
import { Link } from 'react-router-dom';
//========================
import "./ItemList.scss";


const ItemList = ({ items, url, title }) => {

   const currentTrackId = useSelector(state => state.player.playbackState.id);
   const dispatch = useDispatch();
   const token = useSelector(state => state.login.token);

   

   const tracksUris = items?.map((it) => it.uri, []);

   const setToPlay = (position) => {
      
      const data = {
         "uris": tracksUris,
         "offset": {
            "position": position,
         },
      };

      dispatch(togglePlay({ url, token, data }));
   };

   const trackList = items?.map((item, i) => {

      const { images, name, type, id } = item.album;
      // console.log(item.album);

      return (
         <li className='trackitem' key={item.id}
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
            <div className="trackitem__album">
               <Link to={`/${type}/${id}`} className="trackitem__link">{name}</Link>
            </div>

            <div className="trackitem__duration">{songDuration(item.duration_ms)}</div>
         </li>
      )
   });

   return (
      <>
         <div className="artist__title">{title}</div>
         <ul className="artist__tracklist">
            {trackList ?? null}
         </ul>
      </>

   );
};

export default ItemList;