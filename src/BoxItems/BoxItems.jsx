import React from 'react';
import Item from '../Item';
import Error from "../Error";


import "./BoxItems.scss";

function BoxItems({ data, title, subTitile, hasError, errorMessage }) {

   const items = (data?.length < 1) ? <p>Нет ни одного альбома</p> : <Item data={data} />;

   return (
      <div className='boxitems'>
         <div className="boxitems__title">{title}</div>
         <div className="boxitems__subtitle">{subTitile ?? ""}</div>
         <div className="boxitems__collection">
            {hasError ? <Error errorMessage={errorMessage} /> : items}
         </div>
      </div>
   );
}

export default BoxItems;