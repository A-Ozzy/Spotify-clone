import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFollowedArtists } from '../store/playlistSlice';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Error from "../Error";


import './User.scss';

const User = () => {

   const dispatch = useDispatch();
   const { userName, userAvatar, token, hasError, errorMessage } = useSelector(state => state.login);
   const { followedArtists, playlist } = useSelector(state => state.playlist);

   useEffect(() => {

      dispatch(fetchFollowedArtists(token));

   }, [dispatch, userName]);

   if (hasError) {
      return <Error errorMessage={ errorMessage } />
   }
   return (

      <div className='user'>
         <div className="user__header">
            <div className="user__nav">
               <div className="user__arrows">&lt;</div>
               <div className="user__arrows">&gt;</div>
            </div>
            <div className="user__buttons">
               <button className="user__button user__button-trasparent">Сменить тариф</button>
               <button className="user__button user__button-username">Имя пользователя</button>
            </div>
         </div>
         <div className="user__info">
            {userAvatar ?
               <div className="user__photo"><img src={userAvatar} alt="user photo" /></div> :
               <AccountCircleIcon sx={{ width: 200, height: 200, color: "rgba(108, 122, 137, 0.8)" }} />
            }
            <div className="user__ditails userditails">
               <div className="userditails__text">профиль</div>
               <div className="userditails__name">{userName}</div>
               <div className="userditails__info">плэйлисты: {playlist.length} * подписок: {followedArtists.length} </div>
            </div>
         </div>
      </div>
   );
};

export default User;