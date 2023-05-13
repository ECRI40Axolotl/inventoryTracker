const express = require('express');
const fridgeController = require('./controllers/fridgeController.js');

//declare controller here once it's named

const router = express.Router();

//declare routes below

router.get('/', fridgeController.getItems, (req, res) =>
  res.status(200).json(res.locals.inventory)
);

router.post('/', fridgeController.addItem, (req, res) => res.status(200));

module.exports = router;
