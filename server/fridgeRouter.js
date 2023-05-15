const express = require('express');
const fridgeController = require('./controllers/fridgeController.js');

//declare controller here once it's named

const router = express.Router();

//declare routes below

router.get('/', fridgeController.getItems, (req, res) =>
  res.status(200).json(res.locals.inventory)
);

router.post('/create', fridgeController.addItem, (req, res) => res.sendStatus(201));

router.patch('/', fridgeController.updateItem, (req, res) =>
  res.sendStatus(200)
);

router.delete('/deleteItem', fridgeController.deleteItem, (req, res) =>
  res.sendStatus(204)
);

module.exports = router;
