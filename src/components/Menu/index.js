import React from 'react';
import { Link } from 'react-router-dom';
import viewIcon from '../../assets/view.png';
import deleteIcon from '../../assets/delete.png';
import updateIcon from '../../assets/update.png';
import createIcon from '../../assets/create.png';

import style from './index.scss';

const MENU_OPTIONS = [
    {
        type: 'view',
        icon: viewIcon
    },
    {
        type: 'create',
        icon: createIcon
    },
    { type: 'delete', icon: deleteIcon },
    {
        type: 'update',
        icon: updateIcon
    }
];

const Menu = () => {
    return (
        <div className={style.menuContainer}>
            <div className={style.left}>
                <div className={style.title}>Books:</div>
                <div className={style.icons}>
                    {MENU_OPTIONS.map(subMenu => (
                        <Link key={`${subMenu.type}books`} to={`/${subMenu.type}/books`}>
                            <img
                                key={`${subMenu.type}image`}
                                src={subMenu.icon}
                                alt={subMenu.type}
                            />
                        </Link>
                    ))}
                </div>
            </div>
            <div className={style.right}>
                <div className={style.title}>Genres:</div>
                <div className={style.icons}>
                    {MENU_OPTIONS.map(subMenu => (
                        <Link key={`${subMenu.type}books`} to={`/${subMenu.type}/genres`}>
                            <img
                                key={`${subMenu.type}image`}
                                src={subMenu.icon}
                                alt={subMenu.type}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Menu;
