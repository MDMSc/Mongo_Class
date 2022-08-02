// const express = require('express')
import express from "express"; //latest import
import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
import { moviesRouter } from './routes/movies.js';
import { usersRouter } from './routes/users.js';
import { createMobiles, getMobiles } from "./routes/helper.js";
import cors from 'cors';
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
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hey! Welcome to Movies");
});

app.use('/movies', moviesRouter);
app.use('/users', usersRouter);


// get /mobiles
app.get("/mobiles", async (req, res) => {
  const mobiles = await getMobiles(req);
  res.send(mobiles);
});

//create /create-mobiles
app.post("/mobiles", async (req, res) => {
  const data = req.body;
  const result = await createMobiles(data);

  res.send(result);
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
