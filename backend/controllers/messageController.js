const messageModel = require('../models/messageModel');

module.exports.addMessage = async (req, res, next) => {
    try {
        const { from, to, message } = req.body;
        console.log(req.body);
        const data = await messageModel.create({
            message: { text: message },
            users: [from, to],
            sender: from
        });

        if (data) return res.json({ msg: '訊息新增成功', status: true, data });
        return res.json({ msg: '訊息新增失敗', status: false });

    } catch (error) {
        next(error);
    }
};

module.exports.getAllMessage = async (req, res, next) => {
    try {
        // const { userName, isAvatarImageSet, avatarImage } = req.body;

        // const user = await User.findOne({ userName });

        // if (!user) return res.json({ msg: '使用者資料有誤', status: false });

        // const updatedUser = await User.findOneAndUpdate(
        //     user._id,
        //     req.body,
        //     { new: true }
        // );

        // return res.json({ msg: '使用者資料更新成功', status: true, user: updatedUser });

    } catch (error) {
        next(error);
    }
};

