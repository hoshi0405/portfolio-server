const JWT = require("jsonwebtoken");
const AdminUser = require("../models/adminuser");

// クライアントから渡されたJWTが正常　
const tokenDecode = (req) => {
  const beareHeader = req.headers["authorization"];
  if (beareHeader) {
     const bearer = beareHeader.split(" ")[1];
    try {
      const decodedToken = JWT.verify(bearer, process.env.TOKEN_SECRET_KEY);
      return decodedToken;
    } catch {
      return false;
    }
  } else {
    return false;
  }
};



// JWT認証を検証するためのミドルウェア
exports.verifyToken = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req);
  if (tokenDecoded) {
    const adminUser = await AdminUser.findById(tokenDecoded.id);
    if (!adminUser) {
      return res.status(401).json("権限がありません");
    }
    req.adminUser = adminUser;
    next();
  } else {
    return res.status(401).json("権限がありません");
  }
};
