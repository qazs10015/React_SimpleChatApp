// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: [true, 'Username is required'],
//         min: 3,
//         max: 20,
//         unique: true,
//     },
//     email: {
//         type: String,
//         required: [true, 'Email is required'],
//         unique: true,
//         max: 50,
//     },
//     password: {
//         type: String,
//         required: [true, 'Password is required'],
//         min: 6,
//     },
//     isAvatarImageSet: {
//         type: Boolean,
//         default: false,
//     },
//     avatarImage: {
//         type: String,
//         default: '',
//     },
// });

// module.exports = mongoose.model('Users', userSchema);