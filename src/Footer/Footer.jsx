import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
// import Player from '../Player';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentlyPlayingTrack } from '../store/playlistSlice';

import { Box, Slider } from '@material-ui/core';
import Stack from '@mui/material/Stack';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import RepeatIcon from '@mui/icons-material/Repeat';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

import './Footer.scss';

function Footer() {

   const dispatch = useDispatch();
   const token = useSelector(state => state.login.token);
   const currentlyPlayingTrack = useSelector(state => state.playlist.currentlyPlayingTrack);
   const songnameRef = useRef();
   const writerRef = useRef();
   const [songnameWidth, setSongnameWidth] = useState(0);
   const [writerWidth, setWriterWidth] = useState(0);
   const [animate, setAnimate] = useState("");


   useEffect(() => {
      dispatch(fetchCurrentlyPlayingTrack(token));

      if (songnameRef.current.clientWidth > 100) {
         setSongnameWidth(songnameRef.current.clientWidth);
      };

      if (writerRef.current.clientWidth > 100) {
         setWriterWidth(setWriterWidth.current.clientWidth);
      };
      
   }, [token, dispatch, songnameRef.current?.clientWidth, writerRef.current?.clientWidth]);


   function songDuration(duration) {
      var seconds = parseInt((duration / 1000) % 60),
         minutes = parseInt((duration / (1000 * 60)) % 60),
         hours = parseInt((duration / (1000 * 60 * 60)) % 24);

      hours = (hours < 10) ? "0" + hours : hours;
      minutes = (minutes < 10) ? "0" + minutes : minutes;
      seconds = (seconds < 10) ? "0" + seconds : seconds;

      return `${minutes}.${seconds}`;
   }

   return (
      <div className="footer">
         <div className="footer__left footerleft">
            <div className="footerleft__img">
               <img src={currentlyPlayingTrack.songImg} alt="song cover" />
            </div>
            <div className="footerleft__info">
               <div ref={songnameRef}
                  className="footerleft__songname">
                  {currentlyPlayingTrack ? <p style={(songnameWidth > 200)? { animation: "move-text 5s linear infinite alternate" }: {}}>{currentlyPlayingTrack.songName}</p> : <p></p>}
               </div>
               <div
                  ref={writerRef}
                  className="footerleft__writer"
                  style={{ animation: animate }}>
                  {currentlyPlayingTrack ? <p style={(writerRef > 200)? { animation: "move-text 5s linear infinite alternate" }: {}}>{currentlyPlayingTrack.artists}</p> : <p></p>}
               </div>
            </div>
            <div className="footerleft__icons">
               <FavoriteBorderIcon />
               <BrandingWatermarkIcon />
            </div>
         </div>
         <div className="footer__center footercenter">
            <div className="footercenter__control">
               <ShuffleIcon />
               <SkipPreviousIcon />
               <PlayCircleOutlineIcon />
               <SkipNextIcon />
               <RepeatIcon />
            </div>
            <div className="footercenter__track">
               {/* <div className="footercenter__current-ms">{songDuration(currentlyPlayingTrack.playingTrackPosition)}</div> */}
               <div className="footercenter__player">
                  {/* <Player token={token} /> */}
               </div>

               {/* <Slider
                  style={{ width: 400, height: "20%" }}
                  defaultValue={0}
                  min={0}
                  max={songDuration(currentlyPlayingTrack.duration)}
                  step={0.1}
               /> */}
               {/* <div className="footercenter__duration-ms">{songDuration(currentlyPlayingTrack.duration)}</div> */}
            </div>
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