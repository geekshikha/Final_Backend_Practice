const { Router } = require("express");
const User = require("../models").user;
const Story = require("../models").story;

const Spaces = require("../models").space;
const router = new Router();

router.get("/", async (req, res, next) => {
  try {
    const userSpaces = await Spaces.findAll(); //! don't need to include "user model"-- its going to make data leak
    res.send(userSpaces);
  } catch (e) {
    console.log(e.message);
    next();
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const spaceById = await Spaces.findByPk(id, { include: Story }); //! don't need user model ---(only need user model for specific condition)
    res.send(spaceById);
  } catch (e) {
    console.log(e.message);
    next();
  }
});

//Export your router!

module.exports = router;
