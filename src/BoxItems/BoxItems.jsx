import React from 'react';
import Item from '../Item';



import "./BoxItems.scss";

function BoxItems({ data, title }) {


   return (
      <div className='boxitems'>
         <div className="boxitems__title">{title}</div>
         <div className="boxitems__subtitle">Видны только тебе</div>
         <div className="boxitems__collection">
            <Item data={ data} />
         </div>
      </div>
   );
}

export default BoxItems;