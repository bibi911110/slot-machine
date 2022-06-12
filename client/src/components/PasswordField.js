import React from 'react';
import PropTypes from 'prop-types';

import FormField from './FormField';

const PasswordField = (props) => {
    const validatePasswordStrong = (value) => {
        if (value.length <= props.thresholdLength) throw new Error('Must be of at least 8 characters');
        if (!/.*[A-Z].*/g.test(value)) throw new Error('Must contain at least 1 uppercase character');
        if (!/.*\d.*/g.test(value)) throw new Error('Must conatin at least 1 digit ');
    };

    const { type, validator, children, ...restProps } = props;

    return (
        <>
            <div className="position-relative">
                <FormField type="password" validator={validatePasswordStrong} {...restProps}>
                    <span className="d-block form-hint">
                        Password must be more than 7 characters and include one uppercase value and one numeric value
                    </span>
                    {children}
                </FormField>
            </div>
        </>
    );
};

PasswordField.propTypes = {
    label: PropTypes.string.isRequired,
    fieldId: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    required: PropTypes.bool,
    children: PropTypes.node,
    onStateChanged: PropTypes.func,
    minStrength: PropTypes.number,
    thresholdLength: PropTypes.number,
};

export default PasswordField;
