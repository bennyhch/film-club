"use strict";

import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();
const port = process.env.SERVER_PORT || 3001;
import router from "./router";
import cors from "cors";
const cookieParser = require("cookie-parser");
// const SECRETKEY = process.env.SECRETKEY || "this is not very secure";

// const session = require("express-session");
// const SQLiteStore = require("connect-sqlite3")(session);

app.use(cors());
// app.use(
//   session({
//     store: new SQLiteStore(),
//     name: "sessionid",
//     saveUninitialized: false,
//     resave: false,
//     secret: SECRETKEY,
//     cookie: {
//       maxAge: 1000 * 60 * 60 * 24, // 1day
//       sameSite: true,
//       httpOnly: false,
//       secure: false,
//     },
//   })
// );
app.use(cookieParser());
app.use(express.json());

app.use(router);

app.get("/", (req, res) => {
  try {
    res.send("server is connected");
  } catch {
    res.status(404);
    res.send("failed to connect");
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});