var mongoose = require('../mongoose');
var bcrypt = require('bcrypt');

const ROLE_OWNER = require('../constants').ROLE_OWNER;
const ROLE_ADMIN = require('../constants').ROLE_ADMIN;
const ROLE_MEMBER = require('../constants').ROLE_MEMBER;
const ROLE_CLIENT = require('../constants').ROLE_CLIENT;

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        firstName: {type: String},
        lastName: {type: String}
    },
    role: {
        type: String,
        enum: [ROLE_MEMBER, ROLE_CLIENT, ROLE_OWNER, ROLE_ADMIN],
        default: ROLE_MEMBER
    }
}, {
    timestamps: true
});

//add middleware to salt password
UserSchema.pre('save', require('../middlewares/saltPassword'));
//add middleware to verify the password
UserSchema.methods.comparePassword = require('../middlewares/verifyPassword');

module.exports = mongoose.model('User', UserSchema);