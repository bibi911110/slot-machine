import React, { createContext, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { TOKEN_USER_QUERY } from '../graphql/queries';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const user = useQuery(TOKEN_USER_QUERY);

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

export { AuthProvider, AuthContext };