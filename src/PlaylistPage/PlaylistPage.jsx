import React from 'react';
import { useParams } from "react-router-dom";


import "./PlaylistPage.scss";


const PlaylistPage = () => {

   const param = useParams();
   console.log(param.id);
   
   return (
      <div className='playlist'>
         playlist
      </div>
   );
};

export default PlaylistPage;