const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a user name.'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Please enter an email.'],
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Please enter a valid email.'
          }
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'Please enter a password.']
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please confirm the password.'],
        validate: {
            validator: function (val) {
                return val === this.password;
            },
            message: 'Passwords does not match!'
        }
    }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 8);
    this.confirmPassword = undefined;
    next();
});

userSchema.statics.login = async function (name, password) {
    const user = await this.findOne ({name});
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        } else {
            throw new Error ('incorrect password');
        }
    } else {
        throw new Error ('user does not exist');
    }
}


const User = mongoose.model('User', userSchema);

module.exports = User;