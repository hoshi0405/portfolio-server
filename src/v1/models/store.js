// ドキュメント参照
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// ログインしているユーザーとの連携（使える）
const storeSchema = new Schema({
    userId: {
      type: String,
      required: true,
    },
  title: {
    type: String,
    default: "無題",
  },
  latitude:{
    type: String,
    default: "緯度",
  },
  longitude:{
    type: String,
    default: "軽度",
  },
  position:{
    type: Number,
  },
  favorite: {
   type: Array,
    default: [],
  },
  favoritePosition: {
    type: Number,
    default: 0,
  }
});


module.exports = mongoose.model("Store", storeSchema);
