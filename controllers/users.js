const bcrypt = require("bcrypt");
const router = require("express").Router();

const { User, Note } = require("../models");

router.get("/", async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ["password"] },

    include: {
      model: Note,
      attributes: { exclude: ["userId"] },
    },
  });
  res.json(users);
});

router.post("/", async (req, res) => {
  const { username, name, password } = req.body;

  const saltRounds = 10;
  const passwordHash = await (
    await bcrypt.hash(password, saltRounds)
  ).toString();

  const user = new User({
    username: username,
    name: name,
    password: passwordHash,
  });
  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
