import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core';
import { ApolloProvider } from '@apollo/react-hooks';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/authContext';

import { setContext } from 'apollo-link-context';

import { AuthContext } from './context/authContext';
// components, pages
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import SlotMachine from './components/SlotMachine';
import PrivateRoute from './components/PrivateRoute';

import { AUTH_TOKEN } from './constants';

function App() {
    const user = useContext(AuthContext);

    // create http link
    const httpLink = new HttpLink({
        uri: 'http://localhost:8080/graphql',
    });

    // setContext for authtoken
    const authLink = setContext(() => {
        return {
            headers: {
                authtoken: user ? user.token : localStorage.getItem(AUTH_TOKEN),
            },
        };
    });

    // concat http and authtoken link
    const httpAuthLink = authLink.concat(httpLink);

    // create apollo client
    const client = new ApolloClient({
        cache: new InMemoryCache(),
        link: httpAuthLink,
    });

    return (
        <Router>
            <ApolloProvider client={client}>
                <AuthProvider>
                    <Navbar />
                    <ToastContainer />
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/register" component={RegistrationPage} />
                        <Route path="/login" component={LoginPage} />
                        <PrivateRoute path="/slotmachine" component={SlotMachine} />
                    </Switch>
                </AuthProvider>
            </ApolloProvider>
        </Router>
    );
}

export default App;
