// const express = require('express')
import express from "express"; //latest import
import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
import { moviesRouter } from './routes/movies.js';
import { usersRouter } from './routes/users.js';
// import bcrypt from 'bcrypt';

dotenv.config();
// console.log(process.env); // env -> environmental variables

const app = express();
const PORT = process.env.PORT;

// const MONGO_URL = "mongodb://localhost"; // nodejs 16 and before
// const MONGO_URL = "mongodb://127.0.0.1"; // nodejs 16+
const MONGO_URL = process.env.MONGO_URL;
// console.log(MONGO_URL)


async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongodb is connected");
  return client;
}

export const client = await createConnection();

//middleware -> Intercept -> converting body to json
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hey! Welcome to Movies");
});

app.use('/movies', moviesRouter);
app.use('/users', usersRouter);

const mobiles = [
  {
    model: "OnePlus 9 5G",
    img: "https://m.media-amazon.com/images/I/61fy+u9uqPL._SX679_.jpg",
    company: "Oneplus",
  },
  {
    model: "Iphone 13 mini",
    img:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-mini-blue-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1645572315986",
    company: "Apple",
  },
  {
    model: "Samsung s21 ultra",
    img: "https://m.media-amazon.com/images/I/81kfA-GtWwL._SY606_.jpg",
    company: "Samsung",
  },
  {
    model: "Xiomi mi 11",
    img: "https://m.media-amazon.com/images/I/51K4vNxMAhS._AC_SX522_.jpg",
    company: "Xiomi",
  },
];

// /mobiles
app.get("/mobiles", (req, res) => {
  res.send(mobiles);
});

app.listen(PORT, () => console.log(`App is running at ${PORT}`));

//Hashing password
// async function genHashedPassword(password) {
//     const NO_OF_ROUNDS = 10;
//     const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     console.log(salt);
//     console.log(hashedPassword);
//     return hashedPassword;
// }
