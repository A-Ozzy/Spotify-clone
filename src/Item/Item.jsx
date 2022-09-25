import React from 'react';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { Link } from 'react-router-dom';

import "./Item.scss";

function Item({ data }) {   

   const item = data?.map((i) => {

      const { id, name, images, type, } = i;
      
      const typeItem = (type) => {
         switch (type) {
            case "artist":
               return <span>исполнитель</span>;
            case "track":
               return <span>трэк</span>;
            case "album":
               return <span>альбом</span>;
            default:
               return <span>тип не определен</span>;
         }
      };

      return (
         <li className='item' id={id} key={id}>
            <Link to={`/${type}/${id}`}>
               <div className="item__img">
                  <img src={images[2]?.url} alt="cover" />
               </div>
               <div className="item__button"><PlayCircleOutlineIcon /></div>
               <div className="item__name">{name}</div>
               <div className="item__type">
                  {typeItem(type)}
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