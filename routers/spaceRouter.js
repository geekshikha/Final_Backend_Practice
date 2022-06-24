const { Router } = require("express");
const User = require("../models").user;
const Story = require("../models").story;
const Spaces = require("../models").space;
const authMiddleware = require("../auth/middleware");

const router = new Router();

router.get("/", async (req, res, next) => {
  try {
    const userSpaces = await Spaces.findAll(); //! don't need to include "user model"-- its going to make data leak
    res.send(userSpaces);
  } catch (e) {
    // console.log(e.message);
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const spaceById = await Spaces.findByPk(id, { include: Story }); //! don't need user model ---(only need user model for specific condition)
    res.send(spaceById);
  } catch (e) {
    // console.log(e.message);
    next(e);
  }
});

router.patch("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; //! done with help of authMiddleware -- bcoz it makes user obj available(info -- like id, name, etc)

    const spaceToUpdate = await Spaces.findByPk(id);

    //! without this below commented code i'm able to do the patch
    if (spaceToUpdate.userId !== userId) {
      return res
        .status(403)
        .send({ message: "You are not authorized to update this space" });
    }

    const { title, description, backgroundColor, color } = req.body;

    await spaceToUpdate.update({ title, description, backgroundColor, color });

    //! in my frontend state Space has stories, so maybe it's a good idea to send this
    //! updated one with the stories as well. It makes it easier to update redux.
    //! const fullSpace = await Space.findByPk(id, {
    //!   include: [Story]
    //! })
    console.log("heeloooo");
    return res.status(200).send({ spaceToUpdate });
  } catch (e) {
    // console.log(e.message);
    next(e);
  }
});

router.delete(
  "/:spaceId/stories/:storyId",
  authMiddleware,

  async (req, res, next) => {
    try {
      const { spaceId, storyId } = req.params;
      const userId = req.user.id; //! done with help of authMiddleware -- bcoz it makes user obj available(info -- like id, name, etc)

      const storyToDelete = await Story.findByPk(storyId, {
        include: [Spaces],
      });

      if (!storyToDelete) {
        res.satus(404).send("Story not found");
      }
      //! without this below commented code i'm able to do the delete
      if (storyToDelete.space.userId !== userId) {
        return res
          .status(401)
          .send("You're not authorized to delete this story");
      }
      await storyToDelete.destroy();

      res.send({ message: "Deleted Successfully", storyId });
    } catch (error) {
      next(error);
    }
  }
);
//

router.post("/:spaceId/stories", authMiddleware, async (req, res, next) => {
  try {
    const { spaceId } = req.params;
    const { name, content, imageUrl } = req.body;
    const userId = req.user.id;
    console.log("1");
    const spaceWithId = await Spaces.findByPk(spaceId); //! bcoz spaceWithId is whole object
    console.log("2");
    if (spaceWithId === null) {
      return res.status(404).send({ message: "This space does not exist" });
    }

    if (!spaceWithId.userId === userId) {
      return res
        .status(403)
        .send({ message: "You are not authorized to update this space" });
    }

    if (!name) {
      return res.status(400).send({ message: "A story must have a name" });
    }
    console.log("3");
    const newStory = await Story.create({
      name,
      imageUrl,
      content,
      spaceId: spaceWithId.id, //! bcoz spaceWithId is whole object--- we need the id
    });
    console.log("4");
    return res.status(201).send({ message: "Story created", newStory });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

//Export your router!

module.exports = router;
