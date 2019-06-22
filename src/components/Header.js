import React from 'react';
import Logo from './Logo';
import Menu from './Menu';
import style from './Header.scss';

const Header = () => (
    <div className={style.headerContainer}>
        <Logo />
        <Menu />
    </div>
);

export default Header;