import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPlaylists } from '../store/playlistSlice';
import SidebarOption from '../SidebarOption';
import { Link } from "react-router-dom";

import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import StarsIcon from '@mui/icons-material/Stars';

import './Sidebar.scss';

const Sidebar = () => {

   const dispatch = useDispatch();
   const token = useSelector(state => state.login.token);
   const playlist = useSelector(state => state.playlist.playlist);

   useEffect(() => {

      dispatch(fetchUserPlaylists(token));

   }, [token, dispatch]);

   return (
      <div className='sidebar'>
         <div className="sidebar__logo">
            <img src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" alt="spotify-logo" />
         </div>
         <div className="sidebar__menu">
            <SidebarOption Icon={HomeIcon} text="Home" />
            <SidebarOption Icon={SearchIcon} text="Search" />
            <SidebarOption Icon={LibraryBooksIcon} text="Your library" />
            <SidebarOption Icon={ControlPointDuplicateIcon} text="Create playlist" />
            <SidebarOption Icon={StarsIcon} text="Favorit tracks" />
         </div>
         <div className="sidebar__playlists">
            <ul className="playlist">
               {playlist?.map(({ name, id }) => {
                  // console.log(item);
                  // const { name, id } = item;

                  return (
                     <li key={id} data-playlist-id={id}>
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