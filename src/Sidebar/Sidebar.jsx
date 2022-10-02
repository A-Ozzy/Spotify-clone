import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchUserPlaylists } from '../store/playlistSlice';
import { fetchFavoriteTracks } from '../store/favoriteSlice';
import SidebarOption from '../SidebarOption';
import Error from '../Error';
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import StarsIcon from '@mui/icons-material/Stars';

import './Sidebar.scss';

const Sidebar = () => {

   const dispatch = useDispatch();
   const token = useSelector(state => state.login.token);
   const {playlist, hasError, errorMessage } = useSelector(state => state.playlist);
   const currentCollectionUri = useSelector(state => state.player.playbackState.context_uri);

   useEffect(() => {

      dispatch(fetchUserPlaylists(token));
      dispatch(fetchFavoriteTracks(token));

   }, [token, dispatch]);

   return (
      <div className='sidebar'>
         <div className="sidebar__logo">
            <img src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" alt="spotify-logo" />
         </div>
         <div className="sidebar__menu sidebarmenu">
            <ul className='sidebarmenu__list'>
               <li className="sidebarmenu__link">
                  <NavLink to="/home">
                     <SidebarOption Icon={HomeIcon} text="Home" />
                  </NavLink>
               </li>
               <li className="sidebarmenu__link">
                  <NavLink to="/search">
                     <SidebarOption Icon={SearchIcon} text="Search" />
                  </NavLink>
               </li>
               <li className="sidebarmenu__link">
                  <NavLink to="/create-playlist">
                     <SidebarOption Icon={ControlPointDuplicateIcon} text="Create playlist" />
                  </NavLink>
               </li>
               <li className="sidebarmenu__link">
                  <NavLink to="/favorite-tracks">
                     <SidebarOption Icon={StarsIcon} text="Favorit tracks" />
                  </NavLink>
               </li>
            </ul>
         </div>
         <div className="sidebar__playlists">
            {hasError ? <Error errorMessage={ errorMessage } /> : null}
            <ul className="sidebar__playlist">
               {(playlist?.length < 1 && !hasError) ? <li className="sidebar-option">Нет плэйлистов</li> : playlist?.map((item) => {
                  const { name, id, uri } = item;
                  return (
                     <li key={id} data-playlist-uri={uri} className={currentCollectionUri === uri ? "playing" : ""}>
                        <Link to={`/playlist/${id}`}>
                           <SidebarOption text={name} />
                        </Link>
                     </li>
                  )
               })}
            </ul>
         </div>
      </div>
   );
};

export default Sidebar;