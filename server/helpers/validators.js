module.exports.validateRegisterInput = (
    email,
    password,
    dob
) => {
    
    const errors = {};
    
    if (email.trim() === '') {
        errors.email = "Email must not be empty.";
    } else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (!email.match(regEx)) {
            errors.email = "Email must be valid email address";
        }
    }

    if (password.trim() === '') {
        errors.password = "Password must not be empty.";
    } else if (password.length < 8) {
        errors.confirmPassword = "Password must be more than 7 characters.";
    }

    return {
        errors, 
        valid: Object.keys(errors).length < 1
    }

}

module.exports.validateLoginInput = (
    email,
    password
) => {
    const errors = {};
    if (email.trim() === '') {
        errors.email = "Email must not be empty.";
    } else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (!email.match(regEx)) {
            errors.email = "Email must be valid email address";
        }
    }
    if (password.trim() === '') {
        errors.password = "Password must not be empty.";
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}