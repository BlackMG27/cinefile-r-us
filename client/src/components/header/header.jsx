import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import SearchPage from './pages/search/search';
import LoginPage from './pages/login/login';
import SignUpPage from './pages/signup/signup';
import UserPage from './pages/user/user';

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
