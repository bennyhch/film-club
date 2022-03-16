'use strict';
exports.__esModule = true;
var index_js_1 = require("./index.js");
var Schema = index_js_1["default"].Schema;
// Schema
var userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'email is missing'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is missing']
    }
});
var User = index_js_1["default"].model('User', userSchema);
module.exports = User;
