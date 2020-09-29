const express = require("express");
const { models } = require("mongoose");
const router = new express.Router();
const User = require("../db/user/user");

router.post("/users/register", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = user.generateAuthToken();
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
    res.header("auth-token", token).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
