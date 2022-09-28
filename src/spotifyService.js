
const clientId = '56cc4ab9abb849c2b30968f0b315297e';
const redirectUrl = 'https://gregarious-crostata-14f281.netlify.app/api/ayth/callback/spotify';
const apiUrl = 'https://accounts.spotify.com/authorize';
const scopes = [
   "user-read-currently-playing",
   "user-read-recently-played",
   "user-read-playback-state",
   "user-top-read",
   "user-modify-playback-state",
   "user-follow-modify",
   "user-follow-read",
   "user-library-read",
   "playlist-read-private",
   "playlist-read-collaborative",
   "streaming",
   "user-read-email",
   "user-read-private",
   "user-library-modify",
];

export const getTokenFromUrl = () => {

   return window.location.hash
      .substring(1)
      .split("&")
      .reduce((initial, item) => {
         var parts = item.split("=");
         initial[parts[0]] = decodeURIComponent(parts[1]);

         return initial;
      }, {});
};

export const accessUrl = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scopes.join(
   "%20"
)}&response_type=token&show_dialog=false`;


