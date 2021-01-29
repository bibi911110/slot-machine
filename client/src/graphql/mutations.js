import { gql } from 'apollo-boost';
import { AUTH_INFO } from './fragments';

export const USER_REGISTRATION = gql`
    mutation register($input: RegistrationInput!) {
        register(input: $input) {
            ...authInfo
        }
    }
    ${AUTH_INFO}
`

export const USER_LOGIN = gql`
    mutation login($input: LoginInput!) {
        register(input: $input) {
            id
            email
            token
        }
    }
`