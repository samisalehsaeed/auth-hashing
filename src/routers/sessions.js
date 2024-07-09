const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../utils/prisma.js");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (user) {
    const comparePW = await bcrypt.compare(password, user.password);

    if (!comparePW) {
      res.status(401).json({
        error: "Password is invalid",
      });
    }

    const token = jwt.sign({ username: username }, process.env.JWT_SECRET);

    res.status(201).json({
      token,
    });
  } else {
    res.status(401).json({
      error: "Username is invalid",
    });
  }
});

module.exports = router;
