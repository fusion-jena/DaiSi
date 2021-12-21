const db = require("../models");
const Basket = db.baskets;
const Op = db.Sequelize.Op;

// Create
exports.create = async (req, res) => {
  const basket = await Basket.create({ userId: req.body.userId, content: req.body.basketContent });
};

// Read
exports.find = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Basket.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };

exports.findByBasketId = (req, res) => {
    const basketId = req.params.basketId;
  
    Basket.findByPk(basketId)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Basket with id=${basketId}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: `Error retrieving Basket with id=${basketId}.`
        });
      });
  };

exports.findByUserId = (req, res) => {
    const userId = req.params.userId;
  
    Basket.findAll({
      where: {
        userId: userId
      }
    })
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Basket with id=${basketId}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: `Error retrieving Basket with id=${basketId}.`
        });
      });
  };

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};