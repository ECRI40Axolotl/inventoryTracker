const db = require('../models/inventoryModels');
const format = require('pg-format');

const fridgeController = {};

fridgeController.getItems = async (res, req, next) => {
  // string is the query
  const itemQuery =
    'SELECT * FROM item_table FULL OUTER JOIN inventory_table ON item_table._id = inventory_table.item_id';
  console.log("you're in the get items method!");
  try {
    const inventory = await db.query(itemQuery);
    res.locals.inventory = await inventory;
    console.log(inventory);
    return next();
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

module.exports = fridgeController;
