const express = require('express');
const mongoose = require('mongoose');
const { json } = require('express');
const cors = require("cors")
const app = express();
const PORT = process.env.PORT || 3000
require("dotenv").config()
// 忘れがち
app.use(express.json());
app.use(cors({
  origin:"http://localhost:3001",
}))
app.use("/api/v1", require("./src/v1/routes"));
mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
    sslValidate: false,
}).then(() => {
    console.log("DBと接続中")
}).catch((err) => {
    console.log("MongoDBのエラーです")
    console.log(err)
});

// try {
//   mongoose.connect(process.env.MONGODB_URL);
//   console.log("DBと接続中");
// } catch (error){
//   console.log(error);
// }

app.listen(PORT, () => {
  console.log("server");
});
