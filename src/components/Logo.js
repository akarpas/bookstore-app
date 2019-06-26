import React from 'react';
import LogoImage from '../assets/logo.png';

import style from './Logo.scss';

const Logo = () => (
    <div className={style.logoContainer}>
        <img className={style.logo} src={LogoImage} alt="Book Store" />
    </div>
);

export default Logo;