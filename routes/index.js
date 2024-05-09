const Router = require("express");
const router = Router();
const createAccessToken = require("../controllers/accessTOkenController");

router.post("/accessTokens", createAccessToken);

module.exports = router;