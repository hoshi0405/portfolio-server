const { deleteOne } = require("../models/store");
const Store = require("../models/store");
const Favorite = require("../models/favorite");


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
  const { title, latitude, longitude, favorite  } = req.body;
  const { storeId } = req.params;
  try {

    if (title === "") req.body.title = "無題";
    if (latitude === "") req.body.latitude = "軽度";
    if (longitude === "") req.body.longitude = "経度";

    const currentStore = await Store.findById(storeId);
    if (!currentStore) return Store.status(404).json("店舗が存在しません");
     //現在見ているメモがお気に入りがまだされていない時
    if (favorite !== undefined && currentStore.favorite !== favorite) {
      //現在のメモ以外のお気に入りされているメモを探して配列で返す
      const favorites = await Favorite.find({
        user: currentStore.user,
        user: req.user._id,
        favorite: true,
        _id: { $ne: storeId },
      });
      console.log(favorites);

      if (favorite) {
        //自分以外のお気に入りされているメモの数を返す=それが今のメモの位置に設定される。
        req.body.favoritePosition = favorites.length > 0 ? favorites.length : 0;
      } else {
        for (const key in favorites) {
          const element = favorites[key];
          await Store.findByIdAndUpdate(element.id, {
            $set: { favoritePosition: key },
          });
        }
      }
    }

    const updatedstore = await Store.findByIdAndUpdate(storeId, {
      $set: req.body,
    });

    res.status(200).json(updatedstore);
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.getFavorites = async (req, res) => {
  try {
    const favorites = await Store.find({
      user: req.user._id,
      favorite: true,
    }).sort("-favoritePosition");
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
