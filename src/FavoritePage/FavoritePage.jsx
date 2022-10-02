import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSelector } from 'react-redux';
import ItemList from '../ItemList';
import Error from "../Error";

import "./FavoritePage.scss";

const FavoritePage = () => {

   const {userAvatar, userName} = useSelector(state => state.login);
   const { tracks, hasError, errorMessage } = useSelector(state => state.favorite);
   const items = tracks?.map(itm => itm.track , []);

   if (hasError) {
      return <Error errorMessage={errorMessage} />
   }
   return (
      <div className='favorite'>
         <div className="favorite__header">
            <div className="favorite__img">
               <FavoriteIcon sx={{width: 100, height: 100}} />
            </div>
            <div className="favorite__info">
               <div className="favorite__type">плэйлист</div>
               <div className="favorite__name">Любимые треки</div>
               <div className="favorite__owner">
                  <span className='user-logo'>
                     {userAvatar ? <img src={userAvatar} alt="user logo" /> : <AccountCircleIcon sx={{ color: "rgba(108, 122, 137, 0.8)" }}/>}
                  </span>
                  <span>{ userName}</span>
                  <span>{`${tracks.length} tracks`}</span>
               </div>
            </div>
         </div>
         <ItemList items={items} url={"https://api.spotify.com/v1/me/player/play"} />
      </div>
   );
};

export default FavoritePage;