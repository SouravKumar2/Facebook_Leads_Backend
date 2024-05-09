const Router = require("express");
const createAccessToken = require("../controllers/accessTokenController");
const router = Router();

router.post("/accessTokens", createAccessToken);

module.exports = router;