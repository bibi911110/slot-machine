import React from 'react';
import PropTypes from 'prop-types';

import FormField from './FormField';

const DateField = (props) => {

	const validateBirthDate = (value) => {
		if(getAge(value) < 18) throw new Error('Age should be higher than 18 years');
  };
  
  const getAge = (dateString) => {
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

	
  const { type, validator, children, ...restProps } = props;
    
	return (
            <>
				<div className="position-relative">
                    <FormField type="date" validator={validateBirthDate} {...restProps}>
						<span className="d-block form-hint">You must be of at least 18 years to register</span>
                        {children}
                    </FormField>
                </div>
            </>
		);

}

DateField.propTypes = {
	label: PropTypes.string.isRequired,
	fieldId: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	required: PropTypes.bool,
	children: PropTypes.node,
	onStateChanged: PropTypes.func,
	minStrength: PropTypes.number,
	thresholdLength: PropTypes.number
};

export default DateField;
