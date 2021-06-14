const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    title: {
        type: String
    },
    author:{
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    introduce: {
        type: String
    },
    number: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const profile = mongoose.model('profiles', ProfileSchema);

module.exports = {
    ProfileSchema,
    profile
  }
