import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFollowedArtists } from '../store/playlistSlice';


import './User.scss';

const User = () => {

   const dispatch = useDispatch();
   const userName = useSelector(state => state.login.userName);
   const userAvatar = useSelector(state => state.login.userAvatar);
   const followedArtists = useSelector(state => state.playlist.followedArtists);
   const playlist = useSelector(state => state.playlist.playlist);
   const token = useSelector(state => state.login.token);

   useEffect(() => {

      dispatch(fetchFollowedArtists(token));

   }, [dispatch]);

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
            <div className="user__photo">
               <img src={userAvatar} alt="user photo" />
            </div>
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