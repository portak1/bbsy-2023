import { body, query } from "express-validator";

const createShoppingListValidation = [
  body("name").isString().isLength({ min: 3 }),
];

const updateShoppingListValidation = [
  body("name").isString().isLength({ min: 3 }),
];

const getShoppingListValidation = [query("id")];

const addMemberToShoppingListValidation = [body("userId")];
const removeMemberFromShoppingListValidation = [body("userId")];
const deleteShoppingListValidation = [query("id")];

const getItemsFromShoppingListValidation = [query("id")];
const removeItemFromShoppingListValidation = [query("id"), query("itemId")];

const updateItemInShoppingListValidation = [
  query("id"),
  query("itemId"),
];

const itemToShoppingListValidation = [
  query("id"),
  body("name").isString().isLength({ min: 1 }),
  body("completed").isBoolean(),
  body("itemCount").isNumeric(),
];

const getItemFromShoppingListValidation = [query("itemID").isString().isUUID()];

export {
  createShoppingListValidation,
  addMemberToShoppingListValidation,
  itemToShoppingListValidation,
  getShoppingListValidation,
  getItemFromShoppingListValidation,
  deleteShoppingListValidation,
  removeMemberFromShoppingListValidation,
  removeItemFromShoppingListValidation,
  getItemsFromShoppingListValidation,
  updateItemInShoppingListValidation
};
