const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../utils/prisma.js");
const dotenv = require("dotenv");
const password = process.env.JWT_SECRET;
dotenv.config();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 8);

  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });
  res.status(201).json({ user: { username: user.username } });
});

module.exports = router;
