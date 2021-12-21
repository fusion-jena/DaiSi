module.exports = app => {
    const baskets = require("../controllers/basket.controller.js");
    const keycloak = require('../config/keycloak.config.js').getKeycloak();

    var router = require("express").Router();
  
    // Create
    router.post("/", baskets.create);
  
    // Read
    router.get("/", baskets.find);
    router.get("/:basketId", baskets.findByBasketId);
    router.get("/user/:userId", baskets.findByUserId);

    // Update
    router.put("/:basketId", baskets.update);

    // Delete
    router.delete("/", baskets.deleteAll);
    router.delete("/:basketId", baskets.delete);
  
    app.use('/api/baskets', router);
  };