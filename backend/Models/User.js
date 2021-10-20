const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    emailid: {
        type: String,
        required: true,
    },
    mobileNum: {
        type: String,
        required: true,
    },
    books: {
        type: Array,
        default: [],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
});


module.exports = mongoose.model('Users', UserSchema);