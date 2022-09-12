import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from "react-router-dom";
import Sidebar from '../Sidebar';
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
         <Outlet/>
         <Footer/>
      </div>
   );
};

export default MainScreen;