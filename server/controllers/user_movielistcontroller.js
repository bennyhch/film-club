'use strict';

require('dotenv').config();
const user = require('../models/user');
const axios = require('axios');
const apiUrl = 'https://api.themoviedb.org/3/';
const APIKEY = process.env.API_KEY

const numGenTo10 = () => {
  return Math.floor(Math.random() * 11)
}

const numGenTo100 = () => {
  return Math.floor(Math.random() * 101)
}

const numGenTo1000 = () => {
  return Math.floor(Math.random() * 1001)
}

const duplicateCheck = (num, array) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === num) return false;
  }
  return true;
}

const onLoadArrayGen = () => {
  const arr = [1, 2, 3];
  while (arr.length < 6) {
    let num = numGenTo10();
    const check = duplicateCheck(num, arr);
    if (check) {
      arr.push(num);
    }
  }
  while (arr.length < 8) {
    let num = numGenTo100();
    const check = duplicateCheck(num, arr);
    if (check) {
      arr.push(num);
    }
  }
  while (arr.length < 10) {
    let num = numGenTo1000();
    const check = duplicateCheck(num, arr);
    if (check) {
      arr.push(num);
    }
  }
  return arr;
}

const onLoad = async (req, res) => {
  try {
    const arr = onLoadArrayGen()
    const finalResponse = [];
    for (let i = 0; i < arr.length; i++) {
      const apiResponse = await axios.get(`${apiUrl}trending/movie/day?api_key=${APIKEY}&page=${arr[i]}`);
      finalResponse.push(apiResponse.data.results);
    }
    res.status(200);
    res.send(finalResponse);
  } catch (e) {
    console.error("onLoad is failing");
    res.status(500);
  }
}

module.exports = { onLoad };