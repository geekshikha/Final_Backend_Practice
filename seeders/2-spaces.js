"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "spaces",
      [
        {
          title: "Learn",
          description: "Redux is the new huddle to work!",
          backgroundColor: "grey",
          color: "#f2d4cc",

          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Shopping",
          description: "When you are sad, do shopping,shopping,shopping. ",
          backgroundColor: "",
          color: "",

          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("spaces", null, {});
  },
};
