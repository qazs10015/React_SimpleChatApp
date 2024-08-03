const User = require('../models/userModel');

const defaultUser = {
    userName: 'admin',
    email: 'admin@hotmail.com'
}

module.exports.getCurrentUser = async (req, res, next) => {
    try {
        const { userName } = req.body;

        const user = await User.findOne({ userName });

        if (!user) return res.json({ msg: `使用者資料有誤, 找不到 ${userName}`, status: false });

        const newUser = user.toObject();

        delete newUser.avatarImage;

        return res.json(newUser);
    }
    catch (error) {
        next(error);
    }
}

module.exports.update = async (req, res, next) => {
    try {
        const { userName, isAvatarImageSet, avatarImage } = req.body;

        const user = await User.findOne({ userName });

        if (!user) return res.json({ msg: '使用者資料有誤', status: false });

        const updatedUser = await User.findOneAndUpdate(
            user._id,
            req.body,
            { new: true }
        );

        return res.json({ msg: '使用者資料更新成功', status: true, user: updatedUser });

    } catch (error) {
        next(error);
    }
};

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const { userName } = req.body;

        const users = (await User.find({ userName: { $ne: userName } }));

        return res.json({ msg: '已取得所有使用者資料', status: true, users });

    } catch (error) {
        next(error);
    }
};