import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import style from './Menu.scss';

const MENU_OPTIONS = ['view', 'create', 'delete', 'update'];

const Menu = () => {
    const [isShowSubMenu, setIsShowSubMenu] = useState({
        books: false,
        genres: false
    });

    const toggleShowSubMenu = event => {
        const { target } = event;
        const { id } = target;

        if (id === '') {
            setIsShowSubMenu({ books: false, genres: false });
        } else {
            setIsShowSubMenu(
                id === 'books'
                    ? { books: !isShowSubMenu[id], genres: false }
                    : { genres: !isShowSubMenu[id], books: false }
            );
        }
    };

    return (
        <div className={style.menuContainer}>
            <button
                id="books"
                className={style.menuCategory}
                onClick={toggleShowSubMenu}
                type="button"
            >
                {isShowSubMenu.books && (
                    <div className={style.subMenu}>
                        <ul>
                            {MENU_OPTIONS.map(subMenu => (
                                <li key={`${subMenu}books-li`}>
                                    <Link
                                        key={`${subMenu}books`}
                                        to={`/${subMenu}/books`}
                                    >
                                        {subMenu}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                Books
            </button>
            <button
                id="genres"
                className={style.menuCategory}
                onClick={toggleShowSubMenu}
                type="button"
            >
                {isShowSubMenu.genres && (
                    <div className={style.subMenu}>
                        <ul>
                            {MENU_OPTIONS.map(subMenu => (
                                <li key={`${subMenu}genres-li`}>
                                    <Link
                                        key={`${subMenu}genres`}
                                        to={`/${subMenu}/genres`}
                                    >
                                        {subMenu}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                Genres
            </button>
        </div>
    );
};

export default Menu;
