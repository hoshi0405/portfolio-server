const router = require("express").Router();

router.use("/auth", require("./auth"));
router.use("/store", require("./store"));
router.use("/adminstore", require("./adminStore"));
router.use("/adminauth", require("./adminAuth"));


module.exports = router;
