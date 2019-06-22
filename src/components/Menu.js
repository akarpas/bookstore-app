import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import style from './Menu.scss';

const Menu = () => {
    const [isShowSubMenu, setIsShowSubMenu] = useState({
        books: true,
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
                            <li>
                                <Link to="/view/books">View</Link>
                            </li>
                            <li>
                                <Link to="/create/books">Create</Link>
                            </li>
                            <li>
                                <Link to="/delete/books">Delete</Link>
                            </li>
                            <li>
                                <Link to="/update/books">Update</Link>
                            </li>
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
                            <li>
                                <Link to="/view/genres">View</Link>
                            </li>
                            <li>
                                <Link to="/create/genres">Create</Link>
                            </li>
                            <li>
                                <Link to="/delete/genres">Delete</Link>
                            </li>
                            <li>
                                <Link to="/update/genres">Update</Link>
                            </li>
                        </ul>
                    </div>
                )}
                Genres
            </button>
        </div>
    );
};

export default Menu;
