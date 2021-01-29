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
    }, process.env.SECRET_KEY, { expiresIn: '48h'});
}

module.exports = {
    Query: {
        async getCurrentUser(parent, args, { req }) {
            return 'Ujjawal'
        },

        async verifyToken(parent, args, { req }) {
            // get token from header
            const token = req.header("authtoken");
            if (!token) throw new Error('No auth token found');
            try {
                result = jwt.verify(token, process.env.SECRET_KEY);
                authData = { email: result.email, token, id: result._id }
                return authData;
            } catch (err) {
                throw err
            }
        }
    },
    Mutation: {
        // login mutation
        async login (parent, args, { req }) {
            const { email, password, dob} = args.input;
            const { valid, errors } = validateLoginInput(email, password);

            if (!valid) {
                throw new UserInputError('Errors' , { errors });
            }
            
            // getting a user from mongodb
            const user = await User.findOne({ email });

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

            const authData = {
                id: user._id,
                email,
                token
            }

            return authData;
            
        },
        // register mutation
        async register (parent, args, { req }) {
            // req data validation
            const {  email, password, dob } = args.input;
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

            const hashed_password = await bcrypt.hash(password, 12);
          
            const newUser = new User ({
                email,
                password: hashed_password,
                dob
            });

            const result = await newUser.save();

            const token = generateToken(result);

            const authData = {
                id: result._id,
                email,
                token
            };
            return authData; 
        }
    }
}