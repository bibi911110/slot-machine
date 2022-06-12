import React, { useContext, useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import LoadingToRedirect from './LoadingToRedirect';

const PrivateRoute = ({ ...rest }) => {
    const { state } = useContext(AuthContext);
    const [user, setUser] = useState(false);

    useEffect(() => {
        if (state.user) {
            setUser(true);
        }
    }, [state.user]);

    const renderContent = () => <Route {...rest} />;

    return user ? renderContent() : <LoadingToRedirect path="/" />;
};

export default PrivateRoute;
