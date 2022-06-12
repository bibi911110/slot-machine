import React, { useReducer, createContext, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { TOKEN_USER_QUERY } from '../graphql/queries';

// reducer
const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGGED_IN_USER':
            return { ...state, user: action.payload };
        default:
            return state;
    }
};

// state
const initialState = {
    user: null,
};

// create context
const AuthContext = createContext();

// context provider
const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const { data, error } = useQuery(TOKEN_USER_QUERY);
    console.log(data);

    useEffect(() => {
        if (data) {
            const user = data.verifyToken;
            dispatch({
                type: 'LOGGED_IN_USER',
                payload: { email: user.email, token: user.token },
            });
        } else {
            dispatch({
                type: 'LOGGED_IN_USER',
                payload: null,
            });
        }
    }, [data]);

    const value = { state, dispatch };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// export
export { AuthContext, AuthProvider };
