import { gql } from 'apollo-boost'

export const AUTH_INFO = gql`
    fragment authInfo on Auth {
        id
        email
        token
        points
        attempts
        coupons
    }
`;