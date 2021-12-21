module.exports = (sequelize, Sequelize) => {
  const Basket = sequelize.define("basket", {
    basketId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: Sequelize.TEXT
    },
    content: {
      type: Sequelize.TEXT
    },
    query: {
      type: Sequelize.TEXT
    },
    keywords: {
      type: Sequelize.TEXT
    },
    filters: {
      type: Sequelize.TEXT
    }
  });

  return Basket;
};