const User = require("./models").user;
const Spaces = require("./models").space;
const Stories = require("./models").story;

async function listsWithUsers() {
  const userSpaces = await Spaces.findAll({
    raw: true,
    include: [User],
  });

  //If you add the "raw: true" you only have the data itself

  console.log(userSpaces);
}

listsWithUsers();
