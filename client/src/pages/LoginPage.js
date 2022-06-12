import React, { useState, useContext } from 'react';
import '../assets/styles/authform.css';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';

import EmailField from '../components/EmailField';
import PasswordField from '../components/PasswordField';
import { USER_LOGIN } from '../graphql/mutations';
import { AUTH_TOKEN, USER_ID } from '../constants';
import { AuthContext } from '../context/authContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formValidated, setFromValidated] = useState(false);
    const [loading, setLoading] = useState(false);

    const { dispatch } = useContext(AuthContext);

    const history = useHistory();

    const fieldStateChanged =
        (setField, setValidated = setFromValidated) =>
        (value, error) => {
            setField(value);
            setValidated(!error.length > 0);
        };

    const emailChanged = fieldStateChanged(setEmail);
    const passwordChanged = fieldStateChanged(setPassword);

    const showError = () => {
        if (!email.value) {
            toast.error('Please enter email');
        } else if (!password.value) {
            toast.error('Please enter password');
        } else if (!formValidated) {
            toast.error('Correct the shown errors');
        }
    };

    const [login] = useMutation(USER_LOGIN, {
        update: ({ data }) => {
            // update cache
        },
        onError: (err) => {
            console.log(err);
            toast.error(`Failed to login ${err}`);
        },
        onCompleted: ({ login }) => {
            const { email, token, id } = login;
            localStorage.setItem(AUTH_TOKEN, token);
            localStorage.setItem(USER_ID, id);
            dispatch({
                type: 'LOGGED_IN_USER',
                payload: { email, token },
            });
            toast.success('Welcome!');
            history.push('/slotmachine');
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formValidated) {
            showError();
            return;
        }
        setLoading(true);

        await login({ variables: { input: { email, password } } });
        setLoading(false);
    };

    return (
        <div className="form-container d-table-cell position-relative align-middle">
            <form action="/" method="POST" noValidate>
                <div className="d-flex flex-row justify-content-between align-items-center px-3 mb-5">
                    <legend className="form-label mb-0">Login</legend>
                </div>

                <div className="py-5 border-gray border-top border-bottom border-left border-right">
                    <EmailField
                        fieldId="email"
                        label="Email"
                        placeholder="Enter Email Address"
                        onStateChanged={emailChanged}
                        required
                    />
                    <PasswordField
                        fieldId="password"
                        label="Password"
                        placeholder="Enter Password"
                        onStateChanged={passwordChanged}
                        thresholdLength={7}
                        minStrength={3}
                        required
                    />
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="btn btn-primary text-uppercase btn-block px-3"
                        disabled={loading}
                    >
                        {loading ? 'Loading' : 'Login'}
                    </button>
                    <p>New User? Register</p>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
