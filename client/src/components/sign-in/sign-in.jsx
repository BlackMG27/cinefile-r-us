import React, {Fragment, Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loginUser} from "../../redux/actions/authActions";
import classnames from "classnames";


class SignIn extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }

    componentDidMount() { // If logged in and user navigates to Login page, should redirect them to profile page
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/profile");
        }
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/"); // push user to search when they login
        }
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }


    onChange = e => {
        this.setState({[e.target.id]: e.target.value});
    }

    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        console.log(userData);

        this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter

    }

    render() {
        const {errors} = this.state;
        return (
            <Fragment>
                <section className="login">
                    <div className="row">
                        <form noValidate
                            onSubmit={
                                this.onSubmit
                        }>
                            <div className="form__group">
                                <label className="form__label" htmlFor="email">
                                    Email
                                </label>
                                <span className="error-text">
                                    {
                                    errors.email
                                }
                                    {
                                    errors.emailnotfound
                                } </span>

                                <input onChange={
                                        this.onChange
                                    }
                                    value={
                                        this.state.email
                                    }
                                    error={
                                        errors.email
                                    }
                                    id="email"
                                    type="email"
                                    className={
                                        classnames("", {
                                            invalid: errors.email || errors.emailnotfound
                                        })
                                    }/></div>
                            <div className="form__group">
                                <label className="form__label" htmlFor="password">
                                    Password
                                </label>
                                <span className="error-text">
                                    {
                                    errors.password
                                }
                                    {
                                    errors.passwordincorrect
                                } </span>

                                <input onChange={
                                        this.onChange
                                    }
                                    value={
                                        this.state.password
                                    }
                                    error={
                                        errors.password
                                    }
                                    id="password"
                                    type="text"
                                    className={
                                        classnames("", {
                                            invalid: errors.password || errors.passwordIncorrect
                                        })
                                    }/></div>
                            <button className="button form__button">Sign In</button>
                        </form>
                    </div>
                </section>
            </Fragment>
        )
    }
}

SignIn.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({auth: state.auth, errors: state.errors});
export default connect(mapStateToProps, {loginUser})(SignIn);
