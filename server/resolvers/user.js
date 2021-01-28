const User = require('../models/user');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { UserInputError } = require('apollo-server');
require('dotenv').config();


const { validateRegisterInput, validateLoginInput } = require('../helpers/validators');


function generateToken (user) {
    return jwt.sign({
        _id: user._id,
        email: user.email
    }, process.env.SECRET_KEY, { expiresIn: '1h'});
}

module.exports = {
    Query: {
        async getCurrentUser(parent, { token }) {
            return 'Ujjawal'
        },

        async verifyToken(parent, { token }) {
            try {
                if (jwt.verify(token, process.env.SECRET_KEY)) return true;
            } catch (err) {
                return false;
            }
        }
    },
    Mutation: {
        // login mutation
        async login (parent, { email, password }) {
            const { valid, errors } = validateLoginInput(username, password);

            if (!valid) {
                throw new UserInputError('Errors' , { errors });
            }
            
            // getting a user from mongodb
            const user = await User.findOne({ username });

            if (!user) {
                errors.general = "User not found";
                throw new UserInputError('User not found', { errors });
            }

            // password match
            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                errors.general = "Wrong credentials.";
                throw new UserInputError('Wrong credentials.', { errors });
            }

            // sending a token back
            const token = generateToken(user);

            return {
                id: user._id,
                email,
                token
            }
            
        },
        // register mutation
        async register (parent, {  email, password, dob }) {
            // req data validation
            const { valid, errors } = validateRegisterInput(email, password, dob);

            if (!valid) {
                throw new UserInputError('Errors' , { errors });
            }
            
            // validation for unique email address
            const existedEmail = await User.findOne({ email });
            if (existedEmail) {
                throw new UserInputError('Email is taken',  {
                    errors: {
                        email: 'This email is already taken'
                    }
                })
            }

            password = await bcrypt.hash(password, 12);
          
            const newUser = new User ({
                email,
                password,
                dob
            });

            const result = await newUser.save();

            const token = generateToken(result);

            return {
                id: result._id,
                email,
                token
            }
        }
    }
}