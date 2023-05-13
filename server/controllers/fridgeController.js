const db = require('../models/inventoryModels');
const format = require('pg-format');

const fridgeController = {};

/* item_table
_id - INT - serial/REQUIRED
item_name - VARCHAR - REQUIRED
*/

/* inventory_table
_id - INT - serial/REQUIRED
item_id - INT - serial/REQUIRED
expiration - DATE - not required
date_bought - DATE - REQUIRED
status - VARCHAR - REQUIRED
*/

// get all items
fridgeController.getItems = async (req, res, next) => {
  // string is the query
  const itemQuery =
    'SELECT * FROM item_table FULL OUTER JOIN inventory_table ON item_table._id = inventory_table.item_id';
  console.log("you're in the get items method!");
  try {
    const inventory = await db.query(itemQuery);
    res.locals.inventory = await inventory.rows;
    return next();
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

// add items

fridgeController.addItem = async (req, res, next) => {
  console.log("you're in the add item method!");
  const { item_name, expiration, date_bought, status } = req.body;
  // string is the query
  const itemExists =
    // 'SELECT $1 FROM item_table WHERE EXISTS (SELECT $1 FROM item_table)';
    'SELECT COUNT(1) FROM item_table WHERE item_name = $1';
  // adding passed in item name to item table
  const addItemToItemTable = 'INSERT INTO item_table(item_name) VALUES ($1)';
  // TODO: how do we get item_id?????
  const addItemToInventory =
    'INSERT INTO inventory_table (item_id, expiration, date_bought, status) VALUES ((SELECT _id AS item_id FROM item_table WHERE item_table.item_name = $1), $2, $3, $4)';
  // 'INSERT INTO inventory_table (item_id, expiration, date_bought, status) VALUES (1, $2, $3, $4)';
  const itemName = [item_name];
  const values = [item_name, expiration, date_bought, status];
  console.log('values array: ', values);
  // check if item we're adding exists in item_table
  // if not, add it to item_table (that will give it a unique id)
  //  add to inventory_table
  try {
    if ((await db.query(itemExists, [values[0]])) === 0) {
      // if we haven't added the item before, add it to the item table
      await db.query(addItemToItemTable, [values[0]]);
      console.log('NEW ITEM ADDED TO ITEM TABLE');
    } // add the instance of item into the inventory table
    await db.query(addItemToInventory, values);
    console.log('NEW ITEM ADDED TO INVENTORY TABLE');
    return next();
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

// update items

// delete single item

// potentially delete all items of certain id

module.exports = fridgeController;
