const express = require("express");
const { models } = require("mongoose");
const router = new express.Router();
const User = require("../db/user/user");
const Worker=require("../db/workerInfo/workerInfo");

router.post("/users/register", async (req, res) => {
  const user = new User(req.body);

  const worker=new Worker({
    owner: user._id,
  });

  try {
    await user.save();
    await worker.save();
    const token = user.generateAuthToken();
    // res.json({access_token: token}).status(201);
    res.header("auth-token", token).status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findUserByCredentials(
      req.body.email,
      req.body.password
    );
    const token = user.generateAuthToken();
    res.json({access_token: token}).status(201);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
