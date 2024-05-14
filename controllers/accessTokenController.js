const accessTokenModel = require("../modal/accessTokenModel");

const createAccessToken = async (req, res) => {
    try {
        const { appUserId, userAccessToken, pageAccessToken, createdTime } = req.body;
        const newToken = await accessTokenModel.create({ appUserId, userAccessToken, pageAccessToken, createdTime, });
        await newToken.save();
        res.status(200).json({ message: "token sent successfully", newToken });
    } catch (error) {
        console.error("token not sent!!!", error);
        res.status(500).json({ error: "token not sent" });
    }
};

module.exports = createAccessToken;