// ドキュメント参照
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// ログインしているユーザーとの連携（使える）
const favoriteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "Store",
    required: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  favoritePosition: {
    type: Number,
    default: 0,
  }
});


module.exports = mongoose.model("Favorite", favoriteSchema);
