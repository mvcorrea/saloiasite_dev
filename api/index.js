console.log("in api");
const db = require("./models");
const router = require("express").Router();
const saloia = require("./controllers");
const seed = require("./seed");

db.sequelize
   //.sync({ force: true, alter: true })
  .sync({ force: false })
  .then(() => saloia(router))
  //.then(() => seed(db))
  .then(() => console.log("Drop and re-sync db (for testing)."));

router.get("/", (req, res) => {
  res.send("use:<br> /user (get/post)<br> /post (get/post)");
});

module.exports = router;

