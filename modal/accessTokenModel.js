const mongoose = require("mongoose");

const accessToken = new mongoose.Schema(
    {
        accessToken: {
            type: String,
        },
        createdTime: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

const accessTokenModel = mongoose.model("accessToken", accessToken);
module.exports = accessTokenModel;
