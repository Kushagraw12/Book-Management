const mongoose = require('mongoose');


const BookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    copies: {
        type: Number,
        default: 1,
    },
    borrowed: {
        type: Number,
        default: 0,
    }
});


module.exports = mongoose.model('Books', BookSchema);