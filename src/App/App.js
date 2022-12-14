
import { useSelector } from 'react-redux';
import Login from '../Login';
import MainScreen from '../MainScreen';
import Content from '../Content';
import PlaylistPage from '../PlaylistPage';
import ArtistPage from '../ArtistPage';
import AlbumPage from '../AlbumPage';
import FavoritePage from '../FavoritePage';
import { Routes, Route } from "react-router-dom";
import Search from '../Search';


import './App.scss';

function App() {

   const isToken = useSelector(state => state.login.token);

   return (
      <div className="app">
         <Routes>
            <Route path="/" element={isToken ? <MainScreen /> : <Login />}>
               <Route index element={<Content />} />
               <Route path="/playlist/:id" element={<PlaylistPage />} />
               <Route path="/artist/:id" element={<ArtistPage />} />
               <Route path="/album/:id" element={<AlbumPage />} />
               <Route path="/home" element={<Content />} />
               <Route path="/search" element={<Search />} />
               <Route path="/library" element={<Content />} />
               <Route path="/create-playlist" element={<Content />} />
               <Route path="/favorite-tracks" element={<FavoritePage />} />
               
            </Route>
         </Routes>
      </div>
   );
}

export default App;
