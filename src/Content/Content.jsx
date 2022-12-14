import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopArtists } from '../store/playlistSlice';
import User from '../User';
import BoxItems from '../BoxItems';

import './Content.scss';

const Content = () => {

   const dispatch = useDispatch();
   const token = useSelector(state => state.login.token);
   const { topArtists,
      topArtistsError,
      topArtistsErrorMessage } = useSelector(state => state.playlist);  

   useEffect(() => {
      dispatch(fetchTopArtists(token));
   }, [dispatch]);
   
   return (
      <div className='content'>
         <User/>
         <BoxItems data={topArtists}
            title={"Топ исполнителей этого месяца"}
            subTitile={"Видны только тебе"}
            hasError={topArtistsError? topArtistsError : undefined}
            errorMessage={topArtistsErrorMessage? topArtistsErrorMessage : undefined}
         />
      </div>
   );
};

export default Content;