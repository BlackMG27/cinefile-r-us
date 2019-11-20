import React, {Fragment, Component} from 'react';

import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutUser} from "../../redux/actions/authActions";

class UserPage extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const {user} = this.props.auth;
        return (
            <Fragment>
                <section className="profile-title">
                    <h1>Welcome, {
                        user.name
                    }, AKA {
                        user.username
                    }!</h1>
                    <button className="button sign-out-button"
                        onClick={
                            this.onLogoutClick
                    }>Sign Out</button>
                </section>
            </Fragment>
        )
    }
}

UserPage.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({auth: state.auth});
export default connect(mapStateToProps, {logoutUser})(UserPage);
