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

// ** We should probably add logic to check for errors in all of our middleware

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
    return next({
      log: 'Error in getItem controller method',
      status: 400,
      message: 'Error while loading items',
    });
  }
};

// add items

fridgeController.addItem = async (req, res, next) => {
  console.log("you're in the add item method!");
  const { item_name, expiration, date_bought, status } = req.body;
  // string is the query
  const itemExists =
    // 'SELECT $1 FROM item_table WHERE EXISTS (SELECT $1 FROM item_table)';
    'SELECT COUNT(1) FROM item_table WHERE item_name = $1 AND item_name IS NOT NULL';
  // adding passed in item name to item table
  const addItemToItemTable = 'INSERT INTO item_table(item_name) VALUES ($1)';
  // TODO: how do we get item_id?????
  const addItemToInventory =
    // 'INSERT INTO inventory_table (item_id, expiration, date_bought, status) VALUES ((SELECT _id AS item_id FROM item_table WHERE item_table.item_name = $1), $2, $3, $4)';
    'INSERT INTO inventory_table (item_id, expiration, date_bought, status) VALUES ((SELECT _id FROM item_table WHERE item_name = $1 AND _id IS NOT NULL), $2, $3, $4)';
  // 'INSERT INTO inventory_table (item_id, expiration, date_bought, status) VALUES (1, $2, $3, $4)';
  const itemName = [item_name];
  const values = [item_name, expiration, date_bought, status];
  console.log('values array: ', values);
  try {
    // if passed in item exists
    // console.log('item name: ', itemName);
    // TODO *******************************************************************************
    // if we remove the "await", it works for items that already exist
    // if we keep it, it works for items that don't exist
    const itemStatus = await db.query(itemExists, itemName);
    console.log('ITEM STATUS: ', itemStatus.rowCount);
    if (itemStatus.rowCount === 1) {
      console.log('ITEM EXISTS, IN IF STATEMENT');
      // add it to the item table
      await db.query(addItemToInventory, values);
      console.log('ITEM EXISTS: NEW ITEM ADDED TO INVENTORY TABLE');
    } else {
      console.log('IN ELSE STATEMENT');
      await db.query(addItemToItemTable, itemName);
      console.log('ITEM DID NOT EXIST: NEW ITEM ADDED TO ITEM TABLE');
      await db.query(addItemToInventory, values);
      console.log('ITEM DID NOT EXIST: NEW ITEM ADDED TO INVENTORY TABLE');
    }
    // add the instance of item into the inventory table
    return next();
  } catch (err) {
    console.log(err);
    return next({
      log: 'Error in addItem controller method',
      status: 400,
      message: 'Error while adding item',
    });
  }
};

// update items

fridgeController.updateItem = async (req, res, next) => {
  // string is the query
  console.log('request body: ', req.body);
  console.log("you're in the UPDATE items method!");
  const { id, expiration, date_bought, status } = req.body;
  const updateQuery =
    'UPDATE inventory_table SET expiration = $2, date_bought = $3, status = $4 WHERE _id = $1';
  const values = [id, expiration, date_bought, status];
  try {
    await db.query(updateQuery, values);
    return next();
  } catch (err) {
    console.log(err);
    return next({
      log: 'Error in updateItem controller method',
      status: 400,
      message: 'Error while updating item',
    });
  }
};

// delete single item

fridgeController.deleteItem = async (req, res, next) => {
  // string is the query
  console.log('request body: ', req.body);
  console.log("you're in the DELETE items method!");
  const { id } = req.body;
  const deleteQuery = 'DELETE FROM inventory_table WHERE _id = $1;';
  try {
    const inventory = await db.query(deleteQuery, [id]);
    return next();
  } catch (err) {
    console.log(err);
    return next({
      log: 'Error in deleteItem controller method',
      status: 400,
      message: 'Error while deleting item',
    });
  }
};

// potentially delete all items of certain id

module.exports = fridgeController;
