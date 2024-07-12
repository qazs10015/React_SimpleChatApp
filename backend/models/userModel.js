const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'UserName 必填'],
    },
    email: {
        type: String,
        required: [true, 'Email 必填'],
    },
    password: {
        type: String,
        min: 6,
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false,
    },
    avatarImage: {
        type: String,
        default: '',
    },
});

module.exports = mongoose.model('Users', userSchema);