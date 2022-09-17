import React from 'react';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { Link } from 'react-router-dom';

import "./Item.scss";

function Item({ data }) {


   const item = data.map((i) => {
      // console.log(i);

      const { id, name, images, type, href } = i;
      const typeItem = (type === "artist") ? <span>исполнитель</span> : <span>трэк</span>;

      return (
         <li className='item' id={id} key={id}>
            <Link to={`/artist/${id}`}>
               <div className="item__img">
                  <img src={images[2].url} alt="cover" />
               </div>
               <div className="item__button"><PlayCircleOutlineIcon /></div>
               <div className="item__name">{name}</div>
               <div className="item__type">
                  {typeItem}
               </div>
            </Link>

         </li>

      )
   });


   return (
      <ul className="items">
         {item}
      </ul >
   );
}

export default Item;