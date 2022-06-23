"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "stories",
      [
        {
          name: "Hana",
          content: "Redux is hard",
          imageUrl:
            "https://miro.medium.com/max/919/1*EdiFUfbTNmk_IxFDNqokqg.png",
          spaceId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Gina",
          content: "Have to do cutelery-shooping",
          imageUrl:
            "https://cdn11.bigcommerce.com/s-yvpirc28f4/images/stencil/1280x1280/products/68009/168131/stainless-steel-dinnerware-set-24pcs-356_1024x10242x__56518.1635503436.jpg?c=1&imbypass=on",
          spaceId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "John",
          content: "Take my dog to get new pair of shoe",
          imageUrl:
            "https://sc04.alicdn.com/kf/HTB1iSmlXET1gK0jSZFhq6yAtVXad.jpg",
          spaceId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Twinkle",
          content: "Explore new food resturant",
          imageUrl:
            "https://media-cdn.tripadvisor.com/media/photo-s/1a/18/3a/cb/restaurant-le-47.jpg",
          spaceId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("stories", null, {});
  },
};
