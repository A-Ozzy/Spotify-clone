import React, { useEffect, useRef, useState } from 'react';
import Player from '../Player';
import { useDispatch, useSelector } from 'react-redux';

import { Box, debounce, Slider } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import { setPlaybackVolume } from '../store/playerSlice';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

import './Footer.scss';
import { useCallback } from 'react';

function Footer() {

   const dispatch = useDispatch();
   const token = useSelector(state => state.login.token);
   const playbackState = useSelector(state => state.player.playbackState);

   const songnameRef = useRef();
   const writerRef = useRef();
   const [songnameWidth, setSongnameWidth] = useState(0);
   const [writerWidth, setWriterWidth] = useState(0);
   const [defaultVolume, setDefaultVolume] = useState(20);

   const getBackgroundSize = () => {
      return {backgroundSize: `${(defaultVolume * 100) / 100}% 100%`};
   };

   const debouncedVolume = useCallback(
      debounce((defaultVolume) => {
         dispatch(setPlaybackVolume({defaultVolume, token}));
      }, 500), []
   );

   useEffect(() => {
      setSongnameWidth(songnameRef.current.clientWidth);
      setWriterWidth(writerRef.current.clientWidth);
   }, [playbackState, songnameRef.current?.clientWidth, writerRef.current?.clientWidth]);

   useEffect(() => {
      debouncedVolume(defaultVolume)
   }, [defaultVolume]);

   const artists = playbackState?.artists?.map(item => item.name);


   return (
      <div className="footer">
         <div className="footer__left footerleft">
            <div className="footerleft__img">
               {playbackState.songImg ? <img src={playbackState.songImg} alt="song cover" /> : <p>nothing to play</p>}
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
            {/* <Box sx={{ width: 170 }}>
               <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                  <VolumeUpIcon />
                  {/* <Slider
                     color=""
                  /> */}
            {/* </Stack>
            </Box> */}
            <div className="footerright__volume">
               <VolumeUpIcon />
               <input className="footerright__slide"
                  type="range"
                  value={defaultVolume}
                  min={0}
                  max={100}
                  onChange={(e) => setDefaultVolume(e.target.value)}
                  style={getBackgroundSize()}
               />
            </div>
         </div>
      </div>
   );
};

export default Footer;