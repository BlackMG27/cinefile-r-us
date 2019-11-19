import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {registerUser} from '../../redux/actions/authActions';
import classnames from 'classnames';

class SignUpPage extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            username: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        }
    }

    componentDidMount() { // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/profile");
        }
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
    }

    onChange = e => {
        this.setState({[e.target.id]: e.target.value});
    }

    onSubmit = e => {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }
        console.log(newUser);

        this.props.registerUser(newUser, this.props.history);
    }


    render() {
        const {errors} = this.state;

        return (
            <Fragment>
                <section className="register-title">
                    <div className="row">
                        <h2 className="heading-secondary">
                            Hello, You Must Be New !</h2>
                        <Link className="text-link" to="/">
                            Back to Search</Link>
                        <h3 className="heading-tertiary">
                            Already have an account ?&nbsp;
                            <Link className="text-link" to="/login">Login</Link>
                        </h3>
                    </div>
                </section>
                <section className="register">
                    <div className="row">
                        <form noValidate
                            onSubmit={
                                this.onSubmit
                            }
                            className="form">
                            <div className="form__group">
                                <label className="form__label" htmlFor="name">
                                    Name
                                </label>
                                <span className="error-text">
                                    {
                                    errors.name
                                } </span>

                                <input onChange={
                                        this.onChange
                                    }
                                    value={
                                        this.state.name
                                    }
                                    error={
                                        errors.name
                                    }
                                    id="name"
                                    type="text"
                                    className={
                                        classnames("", {invalid: errors.name})
                                    }/>
                            </div>
                            <div className="form__group">
                                <label className="form__label" htmlFor="username">
                                    Username
                                </label>
                                <span className="error-text">
                                    {
                                    errors.username
                                } </span>

                                <input onChange={
                                        this.onChange
                                    }
                                    value={
                                        this.state.username
                                    }
                                    error={
                                        errors.username
                                    }
                                    id="username"
                                    type="text"
                                    className={
                                        classnames("", {invalid: errors.username})
                                    }/>
                            </div>
                            <div className="form__group">
                                <label className="form__label" htmlFor="email">
                                    Email
                                </label>
                                <span className="error-text">
                                    {
                                    errors.email
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
                                        classnames("", {invalid: errors.email})
                                    }/></div>

                            <div className="form__group">
                                <label className="form__label" htmlFor="password">
                                    Password
                                </label>
                                <span className="error-text">
                                    {
                                    errors.password
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
                                        classnames("", {invalid: errors.password})
                                    }/></div>
                            <div className="form__group">
                                <label className="form__label" htmlFor="password2">
                                    Confirm Password
                                </label>
                                <span className="error-text">
                                    {
                                    errors.password2
                                } </span>

                                <input onChange={
                                        this.onChange
                                    }
                                    value={
                                        this.state.password2
                                    }
                                    error={
                                        errors.password2
                                    }
                                    id="password2"
                                    type="text"
                                    className={
                                        classnames("", {invalid: errors.password2})
                                    }/></div>


                            <button className="button form__button" type="submit">
                                Sign Up!
                            </button>
                        </form>

                    </div>
                </section>

            </Fragment>
        )

    }


}

SignUpPage.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({auth: state.auth, errors: state.error});

export default connect(mapStateToProps, {registerUser})(withRouter(SignUpPage));
