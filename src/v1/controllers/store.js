const { deleteOne } = require("../models/store");
const Store = require("../models/store");


exports.create = async (req, res) => {
  try {
    const storeCount = await Store.find().count();
    // メモ新規作成
    const store = await Store.create({
      position: storeCount > 0 ? storeCount : 0,
    });
    res.status(201).json(store);
  } catch {
    res.status(500).json(err)
  }
};


exports.getAll = async (req, res) => {
  try {
    const stores = await Store.find().sort("-position");
    res.status(200).json(stores);
  } catch {
    res.status(500).json(err)
  }
};

exports.getOne = async (req, res) => {
  const { storeId } = req.params;
  try {
    const store = await Store.findOne({ _id: storeId })
    if (!store) return res.status(404).json("店舗が存在しません");
    res.status(200).json(store);
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.update = async (req, res) => {
  const { title, latitude, longitude } = req.body;
  const { storeId } = req.params;
  try {

    if (title === "") req.body.title = "無題";
    if (latitude === "") req.body.latitude = "軽度";
    if (longitude === "") req.body.longitude = "経度";
    const updatedstore = await Store.findByIdAndUpdate(storeId, {
      $set: req.body,
    });

    res.status(200).json(updatedstore);
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.favorite = async (req, res) => {
  const { storeId } = req.params;
 try {
   const store = await Store.findById({ _id: storeId })
   const updatedstore = await Store.findByIdAndUpdate(storeId, {
      $set: req.body,
   });

    //まだ投稿にいいねが押されていなかったら
   if (store.favorite.includes(req.user._id)) {
      await store.updateOne({
        $pull: {
          favorite: req.user._id
        }
      });
     res.status(200).json(updatedstore);
      //すでにいいねが押されていたら
    } else {
      //いいねしているユーザーを取り除く
      await store.updateOne({
        $push: {
          favorite: req.user._id
        }
      });
      res.status(200).json(updatedstore);
   }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const favorites = await Store.find({
      favorite: req.user._id
    }).sort("-position");
    res.status(200).json(favorites);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.delete = async (req, res) => {
  const { storeId } = req.params;
  try {
    const store = await Store.findOne({ _id: storeId })
    if (!store) return res.status(404).json("メモが存在しません");

    await Store.deleteOne({ _id: storeId });
    res.status(200).json("メモを消去しました");
  } catch (err) {
    res.status(500).json(err)
  }
}
