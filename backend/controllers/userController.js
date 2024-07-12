const User = require('../models/userModel');
const brcypt = require('bcrypt');

const defaultUser = {
    userName: 'admin',
    email: 'admin@hotmail.com'
}

module.exports.register = async (req, res, next) => {
    try {
        const { userName, email, password } = req.body;

        const userNameCheck = await User.findOne({ userName });

        if (userNameCheck) return res.json({ msg: 'UserName already exists', status: false });

        const emailCheck = await User.findOne({ email });

        if (emailCheck) return res.json({ msg: 'Email already exists', status: false });

        const hashedPassword = await brcypt.hash(password, 10);

        const user = {
            userName,
            email,
            password: hashedPassword,
        };

        console.log(user);

        User.create(user);

        delete user.password;

        return res.json({ msg: 'User registered successfully', status: true, user });
    } catch (error) {
        next(error);
    }

    // try {
    //     const { userName, email, password } = req.body;

    //     const userNameCheck = userList.filter(user => user.userName === userName).length > 0;

    //     console.log(userList);

    //     if (userNameCheck)
    //         return res.json({ msg: 'Username already exists', status: false });

    //     const emailCheck = userList.filter(user => user.email === email).length > 0;
    //     if (emailCheck)
    //         return res.json({ msg: 'Email already exists', status: false });

    //     const hashedPassword = await brcypt.hash(password, 10);

    //     const user = {
    //         userName,
    //         email,
    //         password: hashedPassword,
    //     };

    //     delete user.password;

    //     // // add new user to the list
    //     userList.push(user);
    //     return res.json({ msg: 'User registered successfully', status: true, user });
    // } catch (error) {
    //     next(error);
    // }

};

module.exports.login = async (req, res, next) => {
    try {
        const { userName, password } = req.body;

        const user = await User.findOne({ userName });
        if (!user) return res.json({ msg: 'UserName 或 Password 有誤', status: false });

        const passwordCheck = await brcypt.compare(password, user.password);
        if (!passwordCheck) return res.json({ msg: 'UserName 或 Password 有誤', status: false });

        User.create(user);

        delete user.password;

        return res.json({ msg: 'User login successfully', status: true, user });
    } catch (error) {
        next(error);
    }

    // try {
    //     const { userName, email, password } = req.body;

    //     const userNameCheck = userList.filter(user => user.userName === userName).length > 0;

    //     console.log(userList);

    //     if (userNameCheck)
    //         return res.json({ msg: 'Username already exists', status: false });

    //     const emailCheck = userList.filter(user => user.email === email).length > 0;
    //     if (emailCheck)
    //         return res.json({ msg: 'Email already exists', status: false });

    //     const hashedPassword = await brcypt.hash(password, 10);

    //     const user = {
    //         userName,
    //         email,
    //         password: hashedPassword,
    //     };

    //     delete user.password;

    //     // // add new user to the list
    //     userList.push(user);
    //     return res.json({ msg: 'User registered successfully', status: true, user });
    // } catch (error) {
    //     next(error);
    // }

};