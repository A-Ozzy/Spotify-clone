import React from 'react';
import Item from '../Item';


import "./BoxItems.scss";

function BoxItems({ data, title, subTitile }) {
   
   return (
      <div className='boxitems'>
         <div className="boxitems__title">{title}</div>
         <div className="boxitems__subtitle">{subTitile ?? ""}</div>
         <div className="boxitems__collection">
            <Item data={ data} />
         </div>
      </div>
   );
}

export default BoxItems;