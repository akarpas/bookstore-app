import React, { useState } from 'react';

import style from './Menu.scss';

const Menu = () => {
    const [isShowSubMenu, setIsShowSubMenu] = useState({
        books: false,
        genres: false
    });

    const toggleShowSubMenu = event => {
        const { target } = event;
        const { id } = target;
        setIsShowSubMenu(
            id === 'books'
                ? { books: !isShowSubMenu[id], genres: false }
                : { genres: !isShowSubMenu[id], books: false }
        );
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
                            <li>View</li>
                            <li>Create</li>
                            <li>Delete</li>
                            <li>Update</li>
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
                            <li>View</li>
                            <li>Create</li>
                            <li>Delete</li>
                            <li>Update</li>
                        </ul>
                    </div>
                )}
                Genres
            </button>
        </div>
    );
};

export default Menu;
