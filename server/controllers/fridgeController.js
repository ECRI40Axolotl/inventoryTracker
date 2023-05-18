const db = require('../models/inventoryModels');
const format = require('pg-format');

const fridgeController = {};

// ** We should probably add logic to check for errors in all of our middleware
const fixDateFormat = (dateString) => {
  const dateObj = new Date(dateString);
  return dateObj.toLocaleDateString();
};

// get all items
fridgeController.getItems = async (req, res, next) => {
  const { userId } = req.user;
  // string is the query
  const itemQuery = `
    SELECT * FROM item_table 
    FULL OUTER JOIN inventory_table ON item_table._id = inventory_table.item_id 
    WHERE inventory_table.user_id = $1
  `;
  // console.log("you're in the get items method!");
  try {
    const inventory = await db.query(itemQuery, [userId]);
    await inventory.rows.forEach((element) => {
      element.date_bought = fixDateFormat(element.date_bought);
      element.expiration = fixDateFormat(element.expiration);
      element.item_name = element.item_name.toUpperCase();
    });
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

// checks if item is in our item table or not, and adds it if not

fridgeController.verifyItem = async (req, res, next) => {
  //console.log("YOU'RE IN THE VERIFYITEM METHOD");
  const { item_name } = req.body;
  const { userId } = req.user;
  //console.log('REQ.BODY: ', req.body);
  req.body.item_name = item_name;
  const itemExists = 'SELECT COUNT(1) FROM item_table WHERE item_name = $1';
  // adding passed in item name to item table
  const addItemToItemTable = 'INSERT INTO item_table(item_name) VALUES ($1)';
  const itemName = [item_name];
  try {
    const itemObject = await db.query(itemExists, itemName);
    const itemStatus = itemObject.rows[0].count;
    // console.log('ITEM STATUS TYPE: ', typeof itemStatus);
    if (itemStatus === '0') {
      // add it to the item table
      const newItem = await db.query(addItemToItemTable, itemName);
    }
    return next();
  } catch (err) {
    console.log(err);
    return next({
      log: 'Error in verifyItem controller method',
      status: 400,
      message: 'Error while verifying item',
    });
  }
};

// add items

fridgeController.addItem = async (req, res, next) => {
  //console.log("YOU'RE IN THE ADD ITEM METHOD");
  const { item_name, expiration, date_bought, quantity } = req.body; // CHANGED-added user_id!!
  //console.log('REQ.BODY: ', req.body);
  // Retrieve the user_id from the authenticated user's information
  const { userId } = req.user;
  const addItemToInventory =
    'INSERT INTO inventory_table (item_id, expiration, date_bought, quantity , user_id) VALUES ((SELECT _id FROM item_table WHERE item_name = $1), $2, $3, $4, $5)';
  const values = [item_name, expiration, date_bought, quantity, userId];
  // console.log('values array: ', values);
  try {
    const itemInv = await db.query(addItemToInventory, values);
    // console.log("db query result for adding item into inventory: ", itemInv)
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
  const { id, expiration, date_bought, quantity } = req.body;
  const { userId } = req.user; // Retrieve the user_id from the authenticated user's information
  const updateQuery =
    'UPDATE inventory_table SET expiration = $2, date_bought = $3, quantity = $4 WHERE _id = $1 AND user_id = $5';
  const values = [id, expiration, date_bought, quantity, userId];
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
  // console.log('request body: ', req.body);
  // console.log("you're in the DELETE items method!");
  const { id } = req.body;
  const { userId } = req.user; // Retrieve the user ID from the authenticated user's information
  const deleteQuery =
    'DELETE FROM inventory_table WHERE _id = $1 AND user_id = $2;';
  const values = [id, userId];
  try {
    const deleteItem = await db.query(deleteQuery, values);
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
