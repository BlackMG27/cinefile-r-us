import React, {Fragment, Component} from 'react';
import {Link} from 'react-router-dom';
import {logoutUser} from "../../redux/actions/authActions";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {

    onLogOutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    }

    render() {

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
                        <li className="nav__link"
                            onClick={
                                this.onLogOutClick
                        }>
                            <Link to="/login">Sign Out</Link>
                        </li>
                    </ul>
                </header>
            </Fragment>
        )
    }

}

Header.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({auth: state.auth});
export default connect(mapStateToProps, {logoutUser})(Header);
