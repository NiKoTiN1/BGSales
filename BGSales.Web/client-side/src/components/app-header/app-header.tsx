import React from 'react';
import { Link } from 'react-router-dom';
import './app-header.scss';

const AppHeader = () => {

    return (
        <header className="header">
            <Link className = "header__link"  to='/authorization'>Authorization</Link>
        </header>
    )
};


export default AppHeader;