import React from 'react';
import { Link } from 'react-router-dom';
import viewIcon from '../assets/view.png';
import deleteIcon from '../assets/delete.png';
import updateIcon from '../assets/update.png';
import createIcon from '../assets/create.png';
import style from './Menu.scss';

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
    // const [isShowSubMenu, setIsShowSubMenu] = useState({
    //     books: false,
    //     genres: false
    // });

    // const toggleShowSubMenu = event => {
    //     const { target } = event;
    //     const { id } = target;

    //     if (id === '') {
    //         setIsShowSubMenu({ books: false, genres: false });
    //     } else {
    //         setIsShowSubMenu(
    //             id === 'books'
    //                 ? { books: !isShowSubMenu[id], genres: false }
    //                 : { genres: !isShowSubMenu[id], books: false }
    //         );
    //     }
    // };

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
