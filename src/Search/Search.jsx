import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import Loader from "../Loader";
import { onSearch } from '../store/searchSlice';
import BoxItems from '../BoxItems';
import ItemList from '../ItemList';
import { removeAll } from '../store/searchSlice';


import "./Search.scss";


const Search = () => {

   const [value, setValue] = useState("");
   const dispatch = useDispatch();
   const token = useSelector(state => state.login.token);
   const { isLoading, hasError, albums, artists, tracks } = useSelector(state => state.search);

   useEffect(() => {
      
      return () => dispatch(removeAll());
   }, [dispatch, token]);

   return (
      <div className='search'>
         <div className="search__header">
            <div className="search__container">
               <div className="search__icon"><SearchIcon /></div>
               <input type="search"
                  value={value}
                  className="search__input"
                  placeholder='что хочешь послушать?'
                  onChange={(e) => setValue(e.target.value)}
                  onKeyPress={(e) => {
                     if (e.key === "Enter") {
                        dispatch(onSearch({ value, token }));
                        setValue("");
                     }
                  }}
               />
            </div>
         </div>
         <div className="search__result">
            {hasError ? <p>Что-то пошло не так</p> : null}
            {isLoading ? <Loader/>: null}
            {!isLoading && !hasError && tracks?.length > 0 ? <ItemList items={tracks} title={"Треки"} url={"https://api.spotify.com/v1/me/player/play"}/> : null}
            {albums?.length > 0? <BoxItems data={albums} title={"Альбомы"} /> : null}
            {artists?.length > 0? <BoxItems data={artists} title={"Исполнители"} />: null}
         </div>
      </div>
   );
};

export default Search;