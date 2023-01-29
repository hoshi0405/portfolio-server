const router = require("express").Router();
const storeController = require("../controllers/store");
const tokenHandler = require("../handlers/tokenHandler")

  // ログインしているユーザーが投稿したメモを全て取得
router.get("/setsearchStore", tokenHandler.verifyToken, storeController.getAll);

module.exports = router;
