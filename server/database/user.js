const
    mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    iphone: {
        type: Number
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    identity: {
        type: String
    },
    sex:{
        type:String
    },
    date: {
        type: String,
        default: new Date()
    }
});
const user = mongoose.model('users', UserSchema);

module.exports = {
    UserSchema,
    user
  }
