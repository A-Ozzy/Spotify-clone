import React, {useEffect} from 'react';
import { getTokenFromUrl } from '../spotifyService';
import { accessUrl } from '../spotifyService';
import { useDispatch } from 'react-redux';
import { hasToken, isLogged } from '../store/loginSlice';

import './Login.scss';


const Login = () => {

   const dispatch = useDispatch();

   useEffect(() => {
      const hash = getTokenFromUrl();
      window.location.hash = '';
      const hashToken = hash.access_token;
      if (hashToken) {         
         dispatch(hasToken(hashToken));
         dispatch(isLogged(true));
      }
   }, [dispatch]);

   return (
      <div className='container'>
         <div className="logo">
            <img src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" alt="spotify" />
         </div>
         <div className="login-btn">
            <a href={accessUrl} className="btn">
               Login with Spotify
            </a>
         </div>
      </div>
   );
};

export default Login;
