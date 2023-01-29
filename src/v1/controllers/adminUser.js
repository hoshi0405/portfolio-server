const JWT = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const AdminUser = require("../models/adminuser");

exports.register = async (req, res) => {
  const password = req.body.password;

  try {
    // パスワードの暗号化
    req.body.password = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY);
    //ユーザーの新規作成
    const adminUser = await AdminUser.create(req.body);
    // JWTの発行
    const token = JWT.sign({ id: adminUser._id }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "24D",
    });
    return res.status(200).json({ adminUser, token });
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // DBからユーザーがいるか探す
    const adminUser = await AdminUser.findOne({ username: username })
    if (!adminUser) {
      return res.status(401).json({
        errors: [
          {
            param: "username",
            msg: "ユーザー名が無効です"
          },
        ],
      });
    }
    //
    const descryptedPassword = CryptoJS.AES.decrypt(
      adminUser.password,
      process.env.SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);

    if (descryptedPassword !== password) {
      return res.status(401).json({
        errors: [
          {
            param: "password",
            msg: "パスワードが無効です"
          },
        ],
      });
    }

    // JWTの発行
    const token = JWT.sign({ id: adminUser._id }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "24D",
    });

    return res.status(201).json({adminUser, token})
  } catch (err) {
    return res.status(500).json(err);
  }
}
