import React, { useEffect, useRef, useState } from 'react';
import Player from '../Player';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Slider } from '@material-ui/core';
import Stack from '@mui/material/Stack';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

import './Footer.scss';

function Footer() {

   const dispatch = useDispatch();
   const token = useSelector(state => state.login.token);
   const playbackState = useSelector(state => state.player.playbackState);

   const songnameRef = useRef();
   const writerRef = useRef();
   const [songnameWidth, setSongnameWidth] = useState(0);
   const [writerWidth, setWriterWidth] = useState(0);


   useEffect(() => {
      setSongnameWidth(songnameRef.current.clientWidth);
      setWriterWidth(writerRef.current.clientWidth);

      // if (songnameRef.current.clientWidth > 150) {
      //    setSongnameWidth(songnameRef.current.clientWidth);
      // };

      // if (writerRef.current.clientWidth > 150) {     
      //    console.log(writerRef.current.firstChild.clientWidth);
      //    setWriterWidth(writerRef.current.clientWidth);
      // };

   }, [playbackState, songnameRef.current?.clientWidth, writerRef.current?.clientWidth]);


   // function songDuration(duration) {
   //    var seconds = parseInt((duration / 1000) % 60),
   //       minutes = parseInt((duration / (1000 * 60)) % 60),
   //       hours = parseInt((duration / (1000 * 60 * 60)) % 24);

   //    hours = (hours < 10) ? "0" + hours : hours;
   //    minutes = (minutes < 10) ? "0" + minutes : minutes;
   //    seconds = (seconds < 10) ? "0" + seconds : seconds;

   //    return `${minutes}.${seconds}`;
   // }

   const artists = playbackState?.artists?.map(item => item.name);
   
   
   return (
      <div className="footer">
         <div className="footer__left footerleft">
            <div className="footerleft__img">
               {playbackState.songImg ? <img src={playbackState.songImg} alt="song cover"/> : <p>nothing to play</p> }
            </div>
            <div className="footerleft__info">
               <div ref={songnameRef}
                  className="footerleft__songname">
                  {playbackState.songName ? <p style={(songnameWidth > 150) ? { animation: "move-text 5s linear infinite alternate" } : {}}>{playbackState.songName}</p> : <p></p>}
               </div>
               <div
                  ref={writerRef}
                  className="footerleft__writer">
                  {playbackState.artists ? <p style={(writerWidth > 150) ? { animation: "move-text 5s linear infinite alternate" } : {}}>{artists?.join(', ')}</p> : <p></p>}
               </div>
            </div>
            <div className="footerleft__icons">
               <FavoriteBorderIcon />
               <BrandingWatermarkIcon />
            </div>
         </div>
         <div className="footer__center footercenter">
            <Player />
         </div>
         <div className="footer__right footerright">
            <Box sx={{ width: 170 }}>
               <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                  <VolumeUpIcon />
                  <Slider />
               </Stack>
            </Box>
         </div>
      </div>
   );
};

export default Footer;