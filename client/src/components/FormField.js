import React, { useState } from 'react';
import PropTypes from 'prop-types';

const FormField = (props) => {

    const [value, setValue] = useState('');
    const [dirty, setDirty] = useState(false);
    const [errors, setErrors] = useState([]);


	const hasChanged = (e) => {
		e.preventDefault();

		const { label, required = false, validator = f => f, onStateChanged = f => f } = props;

        const newValue = e.target.value
		const isEmpty = newValue.length === 0;
        const requiredMissing = dirty && required && isEmpty;
        
        let newErrors = []

		if (requiredMissing) {
			newErrors = [ ...newErrors, `${label} is required` ];
		} else if ('function' === typeof validator) {
			try {
				validator(newValue);
			} catch (e) {
				newErrors = [ ...newErrors, e.message ];
			}
        }
        setDirty(!dirty || dirty);
        setErrors(newErrors);
        setValue(newValue);
        onStateChanged(newValue, newErrors);
	}

	
	const { type, label, fieldId, placeholder, children } = props;
	const hasErrors = errors.length > 0;
	const controlClass = ['form-control', dirty ? hasErrors ? 'is-invalid' : 'is-valid' : '' ].join(' ').trim();

		return (
			<>
				<div className="form-group px-3 pb-2">
                    <div className="d-flex flex-row 
                        justify-content-between align-items-center">
                        <label 
                            htmlFor={fieldId} 
                            className="control-label">
                                {label}
                        </label>
						{ hasErrors && <div className="error form-hint font-weight-bold text-right m-0 mb-2">{ errors[0] }</div> }
					</div>
					{children}
					<input type={type} className={controlClass} id={fieldId} placeholder={placeholder} value={value} onChange={hasChanged} />
				</div>
			</>
		);
	
	
}

FormField.propTypes = {
	type: PropTypes.oneOf(["text", "password", "email"]).isRequired,
	label: PropTypes.string.isRequired,
	fieldId: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	required: PropTypes.bool,
	children: PropTypes.node,
	validator: PropTypes.func,
	onStateChanged: PropTypes.func
};

export default FormField;
