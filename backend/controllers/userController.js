const User = require('../models/userModel');

const defaultUser = {
    userName: 'admin',
    email: 'admin@hotmail.com'
}

module.exports.update = async (req, res, next) => {
    try {
        const { userName, isAvatarImageSet, avatarImage } = req.body;

        const user = await User.findOne({ userName });
        if (!user) return res.json({ msg: '使用者資料有誤', status: false });

        const updatedUser = await User.findOneAndUpdate(
            { userName },
            { $set: req.body },
            { new: true }
        );

        return res.json({ msg: '使用者資料更新成功', status: true, user: updatedUser });

    } catch (error) {
        next(error);
    }
};
