const router = require("express").Router();
const storeController = require("../controllers/store")
const adminTokenHandler = require("../handlers/adminTokenHandler")

// メモを作成
router.post("/adminstore",adminTokenHandler.verifyToken, storeController.create);
  // ログインしているユーザーが投稿したメモを全て取得
router.get("/adminstore", adminTokenHandler.verifyToken, storeController.getAll);

router.get("/:storeId", adminTokenHandler.verifyToken, storeController.getOne);

router.put("/:storeId", adminTokenHandler.verifyToken, storeController.update);

router.delete("/:storeId", adminTokenHandler.verifyToken, storeController.delete);

module.exports = router;
