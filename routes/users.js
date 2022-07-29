import express from "express";
import { createUser, getUserByName } from "./helper.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

//Hashing password
async function genHashedPassword(password) {
  const NO_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);
  // console.log(salt);
  // console.log(hashedPassword);
  return hashedPassword;
}

//convert body -> JSON
// using middleware - express.json()
// router.post('/movies', express.json(), async (req, res) => {
router.post("/signup", async (req, res) => {
  //db.users.insertOne({})
  const { username, password } = req.body;
  const userFromDB = await getUserByName(username);
//   console.log(userFromDB);

  if (userFromDB) {
    res.status(400).send({ msg: "User already exists" });
  } else if(password.length < 8){
    res.status(400).send({ msg: "password must be greater than 8 characters" });
  } else {
    const hashedPassword = await genHashedPassword(password);
    const result = await createUser({
      username: username,
      password: hashedPassword,
    });
    res.send(result);
  }
});

router.post("/login", async (req, res) => {
    //db.users.insertOne({})
    const { username, password } = req.body;
    const userFromDB = await getUserByName(username);
  //   console.log(userFromDB);
  
    if (!userFromDB) {
      res.status(401).send({ msg: "Invalid credentials" });
    } else {
        const storedPassword = userFromDB.password;
        const isPasswordMatched = await bcrypt.compare(password, storedPassword);
        // console.log(isPasswordMatched);
        if (isPasswordMatched) {
            const token = jwt.sign({ id: userFromDB._id }, process.env.SECRET_KEY)
            res.send({ msg: "Logged in successfully", token: token });
        } else{
            res.status(401).send({ msg: "Invalid credentials" });
        }
    }
  });

export const usersRouter = router;
