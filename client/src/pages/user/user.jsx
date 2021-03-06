import React, {Fragment, Component} from 'react';

import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutUser} from "../../redux/actions/authActions";
import API from '../../utils/API';

class UserPage extends Component {
    constructor() {
        super();
        this.state = {
            reviews: [],
            comments: [],
            displayName: '',
            name: '',
            email: ''
        }
    }

    componentDidMount() {
        const {user} = this.props.auth;
        API.getUserProfile(user.id).then(res => {
            this.setState({displayName: res.data.username, email: res.data.email, name: res.data.name})
        }).catch(err => console.log(err))

        API.showUserReviews(user.id).then(res => {
            this.setState({review: res.data})
        }).catch(err => console.log(err))

        API.showCommentsByUser(user.id).then(res => {
            this.setState({comment: res.data})
        }).catch(err => console.log(err))
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };


    render() {
        return (
            <Fragment>
                <section className="profile-title">
                    <h1 className="heading-primary">Welcome, {
                        this.state.displayName
                    }</h1>
                </section>
                <section className="profile-data"></section>
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
