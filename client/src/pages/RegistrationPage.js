import React, { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles/form.css';
import { useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';

import EmailField from '../components/EmailField';
import DateField from '../components/DateField';
import PasswordField from '../components/PasswordField';
import { useHistory } from 'react-router-dom';
import { USER_REGISTRATION } from '../graphql/mutations';
import { AuthContext } from '../context/authContext';
import { AUTH_TOKEN, USER_ID } from '../constants';

const RegistrationPage = () => {
    const [email, setEmail] = useState({ value: '', valid: false });
    const [password, setPassword] = useState({ value: '', valid: false });
    const [dob, setDob] = useState({ value: '', valid: false });
    const [loading, setLoading] = useState(false);
    const { dispatch } = useContext(AuthContext);

    let history = useHistory();

    const fieldStateChanged = (setField) => (value, error) => setField({ value, valid: error.length === 0 });

    const emailChanged = fieldStateChanged(setEmail);
    const passwordChanged = fieldStateChanged(setPassword);
    const dateChanged = fieldStateChanged(setDob);
    const formValidated = email.valid && dob.valid && password.valid;

    const showError = () => {
        if (!email.value) {
            toast.error('Please enter email');
        } else if (!dob.value) {
            toast.error('Please enter date of birth');
        } else if (!password.value) {
            toast.error('Please enter password');
        } else if (!formValidated) {
            toast.error('Correct the shown errors');
        }
    };

    // mutation
    const [register] = useMutation(USER_REGISTRATION, {
        update: ({ data }) => {
            // update cache
        },
        onError: (err) => {
            console.log(err);
            toast.error(`Failed to create user ${err}`);
        },
        onCompleted: ({ register }) => {
            const { email, token, id } = register;
            localStorage.setItem(AUTH_TOKEN, token);
            localStorage.setItem(USER_ID, id);
            dispatch({
                type: 'LOGGED_IN_USER',
                payload: { email, token },
            });
            toast.success('Registered Successfully');
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
        const values = { email: email.value, password: password.value, dob: dob.value };

        await register({ variables: { input: values } });

        setLoading(false);
    };

    return (
        <div className="form-container d-table-cell position-relative align-middle">
            <form action="/" method="POST" noValidate>
                <div className="d-flex flex-row justify-content-between align-items-center px-3 mb-5">
                    <legend className="form-label mb-0">Registration Form</legend>
                </div>

                <div className="py-5 border-gray border-top border-bottom border-left border-right">
                    <EmailField
                        fieldId="email"
                        label="Email"
                        placeholder="Enter Email Address"
                        onStateChanged={emailChanged}
                        required
                    />
                    <DateField
                        fieldId="dob"
                        label="Date of Birth"
                        placeholder="Choose Date of Birth"
                        onStateChanged={dateChanged}
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
                        {loading ? 'Loading' : 'Regsiter'}
                    </button>
                    <p>Already regisered? Login</p>
                </div>
            </form>
        </div>
    );
};

export default RegistrationPage;
