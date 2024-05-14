const mongoose = require("mongoose");

const accessToken = new mongoose.Schema(
    {
        appUserId: {
            type: String,
        },
        userAccessToken: {
            type: String,
        },
        pageAccessToken: {
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
