const router = require("express").Router();
const { body, validationResult } = require('express-validator');
const validation = require("../handlers/validation");
const adminUserController = require("../controllers/adminUser");
const AdminUser = require("../models/adminuser");
const adminTokenHandler = require("../handlers/adminTokenHandler")

// ユーザー新規登録API
router.post(
  "/adminregister",
  body("username")
    .isLength({ min: 8 })
    .withMessage("ユーザー名は８文字以上で入力してください"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("パスワードは8文字以上で入力してください"),
  body("confirmpassword")
    .isLength({ min: 8 })
    .withMessage("確認用パスワードは8文字以上で入力してください"),
  body('username').custom((value) => {
    return AdminUser.findOne({ username: value }).then((adminUser) => {
      if (adminUser) {
        return Promise.reject("このユーザー名はすでに使われています")
      }
    });
  }),
  validation.validate,
  adminUserController.register
);

router.post(
  "/adminlogin",
  body("username")
    .isLength({ min: 8 })
    .withMessage("ユーザー名は８文字以上で入力してください"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("パスワードは8文字以上で入力してください"),
  validation.validate,
  adminUserController.login
);

router.post("/verifytoken", adminTokenHandler.verifyToken, (req, res) => {
  return res.status(200).json({ adminUser: req.adminUser });
});


module.exports = router;
