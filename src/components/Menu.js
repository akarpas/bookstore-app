import React from 'react';

import style from './Menu.scss';

const Menu = () => (
    <div className={style.menuContainer}>
        <div className={style.menuCategory}>Books</div>
        <div className={style.menuCategory}>Genres</div>
    </div>
);

export default Menu;