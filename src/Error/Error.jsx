import React from 'react';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';


import "./Error.scss";


const Error = ({errorMessage}) => {
   return (
      <div className="error">
         <div className="error__icon">
            <ErrorOutlineIcon sx={{ color: "tomato" }} />
         </div>
         <div className="error__massege">{errorMessage}</div>
      </div>
   );
};

export default Error;