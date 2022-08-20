import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Sidebar from '../Sidebar';
import Content from '../Content';
import Footer from '../Footer';

import { fetchUserInfo } from '../store/loginSlice';


import './MainScreen.scss';

const MainScreen = () => {

   const dispatch = useDispatch();
   const token = useSelector(state => state.login.token);


   useEffect(() => {
      dispatch(fetchUserInfo(token));
   }, [dispatch]);


   return (
      <div className="main-screen">
         <Sidebar/>
         <Content/>
         <Footer/>
      </div>
   );
};

export default MainScreen;