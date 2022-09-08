
import { useSelector } from 'react-redux';
import Login from '../Login';
import MainScreen from '../MainScreen';
import PlaylistPage from '../PlaylistPage';
import { Routes, Route } from "react-router-dom";


import './App.scss';

function App() {

   const isToken = useSelector(state => state.login.token);

   return (
      <div className="app">
         <Routes>
            <Route path="/" element={isToken ? <MainScreen /> : <Login />} />
            <Route path="/playlist/:id" element={<PlaylistPage/>} />
         </Routes>
      </div>
   );
}

export default App;
