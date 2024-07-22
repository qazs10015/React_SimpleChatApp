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
        const { from, to } = req.body;

        const messages = await messageModel.find({
            users: { $all: [from, to] }
        }).sort({ updatedAt: 1 });

        const projectMessages = messages.map(msg => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            }
        });
        
        return res.json({ msg: '取得訊息成功', status: true, messages: projectMessages });;

    } catch (error) {
        next(error);
    }
};

