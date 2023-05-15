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

// checks if item is in our item table or not, and adds it if not

fridgeController.verifyItem = async (req, res, next) => {
  console.log("you're in the verifyItem method!")
  const { item_name } = req.body;
  const itemExists =
    'SELECT COUNT(1) FROM item_table WHERE item_name = $1 AND item_name IS NOT NULL';
  // adding passed in item name to item table
  const addItemToItemTable = 'INSERT INTO item_table(item_name) VALUES ($1)';
  const itemName = [item_name];
  try {
    const itemObj = await db.query(itemExists, itemName);
    // console.log("itemObj: ", itemObj);
    const itemStatus = itemObj.rows[0].count;
    console.log('ITEM STATUS: ', itemStatus);
    if (itemStatus !== 1) {
      // add it to the item table
      await db.query(addItemToItemTable, itemName);
      console.log('ITEM EXISTS: NEW ITEM ADDED TO INVENTORY TABLE');
      return next();
    } 
    else {
      return next();
    }
  } catch(err){
    console.log(err)
    return next({
      log: 'Error in verifyItem controller method',
      status: 400,
      message: 'Error while verifying item',
    })
  }
}

// add items

fridgeController.addItem = async (req, res, next) => {
  console.log("you're in the add item method!");
  const { item_name, expiration, date_bought, status } = req.body;
  const addItemToInventory =
    'INSERT INTO inventory_table (item_id, expiration, date_bought, status) VALUES ((SELECT _id FROM item_table WHERE item_name = $1 AND _id IS NOT NULL), $2, $3, $4)';
    const values = [item_name, expiration, date_bought, status];
  console.log('values array: ', values);
  try {
    // // if passed in item exists
    // // console.log('item name: ', itemName);
    // // **this is different now because we changed to itemObj instead of just itemStatus: if we remove the "await", it works for items that already exist
    // // if we keep it, it works for items that don't exist
    // const itemObj = await db.query(itemExists, itemName);
    // console.log("itemObj: ", itemObj);
    // // change to itemObject above
    // //declare variable itemStatus that awaits result of itemobject.rowcount
    // const itemStatus = itemObj.rows[0].count;
    // //then plug it into places we need below
    // console.log('ITEM STATUS: ', itemStatus);
    // if (itemStatus !== 1) {
    //   console.log('ITEM EXISTS, IN IF STATEMENT');
    //   // add it to the item table
    //   await db.query(addItemToItemTable, itemName);
    //   console.log('ITEM EXISTS: NEW ITEM ADDED TO INVENTORY TABLE');
    // } 
    // // add item to inventory
    await db.query(addItemToInventory, values);
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
