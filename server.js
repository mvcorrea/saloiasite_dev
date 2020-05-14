const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const api = require("./api");

app.use(bodyParser.json());
app.use("/api", api);
app.get("/", (req, res) => {
    res.send("working");
})

const port = process.env.PORT || 5002;
app.listen(port, () => console.log("listening no: " + port));


/*
 examples:
 https://grokonez.com/node-js/sequelize-one-to-many-association-nodejs-express-mysql

 */
