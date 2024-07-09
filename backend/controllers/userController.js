const User = require('../models/userModel');
const brcypt = require('bcrypt');

const defaultUser = {
    userName: 'admin',
    email: 'admin@hotmail.com'
}

const userList = [];

module.exports.register = async (req, res, next) => {
    // console.info(req.body);
    // res.send('Registration endpoint hit');

    try {
        const { userName, email, password } = req.body;

        const userNameCheck = userList.filter(user => user.userName === userName).length > 0;

        console.log(userList);

        if (userNameCheck)
            return res.json({ msg: 'Username already exists', status: false });

        const emailCheck = userList.filter(user => user.email === email).length > 0;
        if (emailCheck)
            return res.json({ msg: 'Email already exists', status: false });

        const hashedPassword = await brcypt.hash(password, 10);

        const user = {
            userName,
            email,
            password: hashedPassword,
        };

        delete user.password;

        // // add new user to the list
        userList.push(user);
        return res.json({ msg: 'User registered successfully', status: true, user });
    } catch (error) {
        next(error);
    }

};