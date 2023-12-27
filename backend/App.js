const express = require('express');
const App = express();
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 8000;
const route = express.Router();
const db = require("./Config/mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

App.use(express.json()); 
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: true }));
App.use(cookieParser());
App.use(cors());

App.use("/", require("./Routes"));

App.listen(PORT, () => {
    console.log("Server listening on port " + PORT);
})