const accessTokenModel = require("../modal/accessTokenModel");


const createAccessToken = async (req, res) => {
    try {
        const { accessToken, createdTime } = req.body;
        const newToken = await accessTokenModel.create({ accessToken, createdTime });
        await newToken.save();
        res.status(200).json({ message: "review sent successfully", newToken });
    } catch (error) {
        console.error("review not sent!!!", error);
        res.status(500).json({ error: "review not sent" });
    }
};

module.exports = createAccessToken;