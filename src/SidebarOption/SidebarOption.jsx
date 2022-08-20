import React from 'react';


import './SidebarOption.scss';

const SidebarOption = ({Icon, text}) => {

   return (
      <div className='sidebar-option'>
         <div className="sidebar-option__icon">
            {Icon && <Icon/>}
         </div>
         <div className="sidebar-option__text">{Icon? <h4>{text}</h4> : <p>{text}</p>}</div>
      </div>
   );
};

export default SidebarOption;