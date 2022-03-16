'use strict';
exports.__esModule = true;
require('dotenv').config();
var mongoose_1 = require("mongoose");
var dotenv = require("dotenv");
dotenv.config();
mongoose_1["default"].connect("mongodb://127.0.0.1:27017/".concat(process.env.DB_NAME))
    .then(function () {
    console.log('connected');
})["catch"](function (e) {
    console.log('error connecting', e);
});
exports["default"] = mongoose_1["default"];
