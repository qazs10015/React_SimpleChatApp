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

        return res.json({ msg: 'User registered successfully', status: true });
    } catch (error) {
        next(error);
    }
};

module.exports.login = async (req, res, next) => {
    try {
        const { userName, password } = req.body;

        const user = await User.findOne({ userName });
        if (!user) return res.json({ msg: 'UserName 或 Password 有誤', status: false });

        const passwordCheck = await brcypt.compare(password, user.password);
        if (!passwordCheck) return res.json({ msg: 'UserName 或 Password 有誤', status: false });

        const userObj = user.toObject();

        // 刪除前端不必要的欄位
        if ('__v' in userObj) delete userObj.__v;

        delete userObj.password;

        return res.json({ msg: '登入成功', status: true, user: userObj });
    } catch (error) {
        next(error);
    }
};
