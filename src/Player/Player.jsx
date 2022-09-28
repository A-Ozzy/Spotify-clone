import React, { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
   togglePlay,
   switchToNextPrevious,
   switchDevice,
   toggleShuffle,
   toggleRepeat,
} from '../store/playerSlice';
import { setPlaybackState, setDeviceId } from '../store/playerSlice';

import ShuffleIcon from '@mui/icons-material/Shuffle';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import RepeatIcon from '@mui/icons-material/Repeat';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';

// import axios from 'axios';

import './Player.scss';

function Player() {

   const dispatch = useDispatch();
   const token = useSelector(state => state.login.token);
   const playbackState = useSelector(state => state.player.playbackState);
   // const resetDevice = useSelector(state => state.player.resetDevice);
   // const deviceId = useSelector(state => state.player.deviceId);

   let fireyPlayer = useRef(null);


   // create a new cross browser audio player with spotify webplayback sdk
   const loadScript = () => {
      const script = document.createElement("script");
      script.id = "spotify-player";
      script.type = "text/javascript";
      script.async = "async";
      script.defer = "defer";
      script.src = "https://sdk.scdn.co/spotify-player.js";
      document.body.appendChild(script);
   };


   const InitializePlayer = useCallback(() => {
      // console.log("initializing firey spotify 👾");
      let { Player } = window.Spotify;
      fireyPlayer = new Player({
         name: "Firey Spotify🔥",
         getOAuthToken: (cb) => {
            cb(token);
         },
      });
      // Error handling
      fireyPlayer.addListener("initialization_error", ({ message }) => {
         console.log(message);
      });
      fireyPlayer.addListener("authentication_error", ({ message }) => {
         console.log(message);
      });
      fireyPlayer.addListener("account_error", ({ message }) => {
         console.log(message);
      });
      fireyPlayer.addListener("playback_error", ({ message }) => {
         console.log(message);
      });
      // Playback status updates
      fireyPlayer.addListener("player_state_changed", (state) => {
         console.log("player_state_changed");         
         try {
            if (state) {

               const { duration, paused, position, repeat_mode, shuffle, track_window, context } = state;
               const { current_track } = track_window;
               dispatch(setPlaybackState({
                  context_uri: context.uri,
                  songName: current_track.name,
                  id: current_track.id,
                  songImg: current_track.album.images[1].url,
                  artists: current_track.artists,
                  play: !paused,
                  repeat: repeat_mode !== 0,
                  shuffle: shuffle,
                  progress: position,
                  duration: duration,
               }));
            }
         } catch (error) {
            console.log(error);
         }
      });
      // Ready
      fireyPlayer.addListener("ready", ({ device_id }) => {
         dispatch(setDeviceId(device_id));
         dispatch(switchDevice({ device_id, token }));
         console.log("Ready with Device ID", device_id);
      });
      // Not Ready
      fireyPlayer.addListener("not_ready", ({ device_id }) => {
         console.log("Device ID has gone offline", device_id);
      });
      // Connect the player!
      fireyPlayer.connect()
   }, []);

   const toggleMusic = () => {
      const url = playbackState.play ? `https://api.spotify.com/v1/me/player/pause` : `https://api.spotify.com/v1/me/player/play`;
      dispatch(togglePlay({ url, token }));

   };

   const switchNextPrevious = (value) => {
      const url = `https://api.spotify.com/v1/me/player/${value}`
      dispatch(switchToNextPrevious({ url, token }));
   };

   const switchShuffle = (action) => {
      dispatch(toggleShuffle({ action, token }))
   };

   // useEffect(() => {
   //    if (resetDevice) {
   //       // console.log("device: ", deviceId );
   //       async function check() {
   //          const response = await axios({
   //             method: "GET",
   //             url: "https://api.spotify.com/v1/me/player/devices",
   //             headers: {
   //                Authorization: `Bearer ${token}`,
   //                'Content-Type': "application/json"
   //             },
   //             // data: {
   //             //    "device_ids": [device_id],
   //             //    play: false,
   //             // }
   //          });
   //          if (response.status === 200) {
   //             console.log(response);
                
   //          } else {
   //             console.log(response.status);
   //          }
   //       }

   //       check()
   //       // dispatch(switchDevice({ device_id : deviceId, token }));

   //    }
   // }, [resetDevice]);

   const switchRepeat = useCallback((value) => {
      const action = value ? "off" : "track";
      dispatch(toggleRepeat({ action, token }));
   }, [playbackState.repeat]);



   useEffect(() => {
      loadScript();
      window.onSpotifyWebPlaybackSDKReady = () => InitializePlayer();
      // get current state of the player
      return () => {
         fireyPlayer.disconnect();
      }
   }, [token]);

   return (
      <div className="player">
         <div className="player__controls">
            <div className="player__shuffle"
               onClick={() => switchShuffle(!playbackState.shuffle)}>
               <ShuffleIcon />
               <div className={`indicator ${playbackState.shuffle ? "active" : ""} `}></div>
            </div>
            <div className="player__previous"
               onClick={() => switchNextPrevious("previous")}>
               <SkipPreviousIcon />
            </div>
            <div onClick={toggleMusic}
               className="player__play">
               {!playbackState.play ? <PlayCircleOutlineIcon /> : <PauseCircleOutlineIcon />}
            </div>
            <div className="player__next"
               onClick={() => switchNextPrevious("next")}>
               <SkipNextIcon />
            </div>
            <div className="player__repeat"
               onClick={() => switchRepeat(playbackState.repeat)}>
               <RepeatIcon />
               <div className={`indicator ${playbackState.repeat ? "active" : ""} `}></div>
            </div>
         </div>
         {/* <div className="player__progressbar">
                        <div className="duration">
                            {playbackScrub ? minutesAndSeconds(playbackScrub) : minutesAndSeconds(playbackState.progress)}
                        </div>
                        <Progressbar
                            value={positionPb}
                            setValue={(ratio) => seekPlaybackPosition(ratio)}
                            func={playbackFunc}
                        />
                        <div className="duration">
                            {minutesAndSeconds(playbackState.duration)}
                        </div>
                    </div> */}
      </div>
   );
}

export default Player;