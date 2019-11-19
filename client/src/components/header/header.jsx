import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
    return (
        <Fragment>
            <header className="nav">
                <div className="nav__logo-box"></div>
                <ul className="nav__list">
                    <li className="nav__link">
                        <Link to="/">Search</Link>
                    </li>
                    <li className="nav__link">
                        <Link to="/login">Login</Link>
                    </li>
                    <li className="nav__link">
                        <Link to="/signup">Sign Up</Link>
                    </li>
                    <li className="nav__link">
                        <Link to="/profile">Profile</Link>
                    </li>
                </ul>
            </header>
        </Fragment>
    )
}
export default Header;
