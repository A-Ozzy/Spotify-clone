export const songDuration = (duration) => {
   var seconds = parseInt((duration / 1000) % 60),
      minutes = parseInt((duration / (1000 * 60)) % 60),
      hours = parseInt((duration / (1000 * 60 * 60)) % 24);

   hours = (hours < 10) ? "0" + hours : hours;
   minutes = (minutes < 10) ? "0" + minutes : minutes;
   seconds = (seconds < 10) ? "0" + seconds : seconds;

   // return `${minutes}.${seconds}`;
   return hours > 0 ? `${hours}.${minutes}.${seconds}` : `${minutes}.${seconds}`;
};
