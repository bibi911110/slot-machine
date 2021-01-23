import React, { useState } from 'react';
import '../styles/form.css'

import Alert from '../components/Alert';
import EmailField from '../components/EmailField';
import PasswordField from '../components/PasswordField';

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formValidated, setFromValidated] = useState(false);
    const [alert, setAlert] = useState({show: false, msg: '', type: ''});
    

    const fieldStateChanged = (setField, setValidated = setFromValidated) => 
        (value, error) => 
            {setField(value); setValidated(!error.length > 0);};
    

    const emailChanged = fieldStateChanged(setEmail);
    const passwordChanged = fieldStateChanged(setPassword);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!email) {
            showAlert(true, 'danger', 'Please enter email')
        } else if (!password) {
            showAlert(true, 'danger', 'Please enter password')
        } else if (!formValidated) {
            showAlert(true, 'danger', 'Correct the shown errors');
        }
        console.log(email, password);
    }

    const showAlert = (show = false, type= '', msg = '') => {
        setAlert({show, type, msg});
    }

    return (
        <div className="form-container d-table-cell position-relative align-middle">
            <form action="/" method="POST" noValidate>

                <div className="d-flex flex-row justify-content-between align-items-center px-3 mb-5">
                    <legend className="form-label mb-0">Login</legend>
                        
                </div>
                {alert.show && <Alert {...alert} removeAlert={showAlert} />}


                <div className="py-5 border-gray border-top border-bottom border-left border-right">
                    <EmailField fieldId="email" label="Email" placeholder="Enter Email Address" onStateChanged={emailChanged} required />
                    <PasswordField fieldId="password" label="Password" placeholder="Enter Password" onStateChanged={passwordChanged} thresholdLength={7} minStrength={3} required />
                    <button type="button" onClick={handleSubmit} className="btn btn-primary text-uppercase btn-block px-3">Login</button>
                    <p>New User? Register</p>
                </div>


            </form>
            </div>
        );
	

}

export default LoginPage;
