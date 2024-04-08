const mongoose = require("mongoose");

const souravSchema = new mongoose.Schema(
  {
    adgroupId: {
      type: String,
    },
    adId: {
      type: String,
    },
    createdTime: {
      type: Date,
    },
    leadgenId: {
      type: String,
    },
    pageId: {
      type: String,
    },
    formId: {
      type: String,
    },
    userData: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

const souravModel = mongoose.model("facehook", souravSchema);
module.exports = souravModel;
