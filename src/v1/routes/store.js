const router = require("express").Router();
const storeController = require("../controllers/store");
const tokenHandler = require("../handlers/tokenHandler")


// ログインしているユーザーが投稿したメモを全て取得
router.get("/favorites", tokenHandler.verifyToken, storeController.getFavorites);

router.get("/", tokenHandler.verifyToken, storeController.getAll);

router.get("/:storeId", tokenHandler.verifyToken, storeController.getOne);

router.put("/:storeId", tokenHandler.verifyToken, storeController.update);

router.put("/:storeId/favorite", tokenHandler.verifyToken, storeController.favorite);

router.delete("/:storeId", tokenHandler.verifyToken, storeController.delete);


// 店舗検索用データを全て取得
router.get("/searchstore", tokenHandler.verifyToken, storeController.getAll);



module.exports = router;
