import { gql, useQuery } from 'apollo-boost';

export const TOKEN_USER_QUERY = gql`
    query  {
        verifyToken {
            email
            id
            token
        }
    }
`

export const GET_CURRENT_USER = gql`
    query {
        getCurrentUser
    }
`