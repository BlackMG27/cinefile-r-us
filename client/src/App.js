import React, {Fragment} from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import {setCurrentUser, logoutUser} from "./redux/actions/authActions";

import store from './redux/store';
// pages
import SearchPage from './pages/search/search';
import LoginPage from './pages/login/login';
import SignUpPage from './pages/signup/signup';
import UserPage from './pages/user/user';
import MoviePage from './pages/movie/movie';
import Header from "./components/header/header";
import PrivateRoute from "./components/private-route/PrivateRoute";
import './App.css';

// Check for token to keep user logged in
if (localStorage.jwtToken) { // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));
    // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) { // Logout user
        store.dispatch(logoutUser());
        // Redirect to login
        window.location.href = "./login";
    }
}

function App() {
    return (
        <Provider store={store}>
            <Fragment>
                <BrowserRouter>
                    <Header/>
                    <Route exact path="/"
                        component={SearchPage}/>
                    <Route exact path="/login"
                        component={LoginPage}/>
                    <Route exact path="/signup"
                        component={SignUpPage}/>
                    <Route path="/movie/:id"
                        component={MoviePage}/>
                    <Switch>
                        <PrivateRoute exact path="/profile/:id"
                            component={UserPage}/>
                    </Switch>

                </BrowserRouter>
            </Fragment>

        </Provider>

    );
}

export default App;
