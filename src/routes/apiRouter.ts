import { Router } from "express";
import {
  AUTH_BASE,
  AUTH_LOGIN,
  AUTH_REGISTER,
  SHOPPING_LIST_BASE,
  SHOPPING_LIST_LISTS,
  SHOPPING_LIST_GET,
  SHOPPING_LIST_DELETE,
  SHOPPING_LIST_MEMBERS_BASE,
  SHOPPING_LIST_MEMBERS_DELETE,
  SHOPPING_LIST_ITEMS_BASE,
  SHOPPING_LIST_ITEMS_PATCH,
  SHOPPING_LIST_ITEMS_DELETE,
} from "./paths";
import {
  itemToShoppingListValidation,
  createShoppingListValidation,
  addMemberToShoppingListValidation,
  getShoppingListValidation,
} from "./valid/shoppingLists";
import { expressjwt } from "express-jwt";
import dotenv from "dotenv";
import { authValidation } from "./valid/auth";
import {
  deleteShoppingList,
  getShoppingList,
  getShoppingLists,
  createShoppingList,
  addMemberToShoppingList,
  deleteMemberFromShoppingList,
  addItemToShoppingList,
} from "../services/shoppingList";
import { login, register } from "../services/authorize";

dotenv.config();

const apiRouter = Router({});

apiRouter.use(
  SHOPPING_LIST_LISTS,
  expressjwt({
    secret: process.env.JWT_SECRET ?? "",
    algorithms: ["HS256"],
  }),
  getShoppingLists
);

const authRouter = Router();

authRouter.post(AUTH_REGISTER, authValidation, register);
authRouter.post(AUTH_LOGIN, authValidation, login);

apiRouter.use(AUTH_BASE, authRouter);

const shoppingListRouter = Router();

shoppingListRouter.get(
  SHOPPING_LIST_GET,
  getShoppingListValidation,
  getShoppingList
);

shoppingListRouter.delete(
  SHOPPING_LIST_DELETE,
  getShoppingListValidation,
  deleteShoppingList
);

shoppingListRouter.post("", createShoppingListValidation, createShoppingList);

shoppingListRouter.post(
  SHOPPING_LIST_MEMBERS_BASE,
  addMemberToShoppingListValidation,
  addMemberToShoppingList
);

shoppingListRouter.delete(
  SHOPPING_LIST_MEMBERS_DELETE,
  addMemberToShoppingListValidation,
  deleteMemberFromShoppingList
);

shoppingListRouter.post(
  SHOPPING_LIST_ITEMS_BASE,
  itemToShoppingListValidation,
  addItemToShoppingList
);

shoppingListRouter.patch(
  SHOPPING_LIST_ITEMS_PATCH,
  itemToShoppingListValidation,
  addItemToShoppingList
);

shoppingListRouter.delete(
  SHOPPING_LIST_ITEMS_DELETE,
  itemToShoppingListValidation,
  addItemToShoppingList
);

apiRouter.use(
  SHOPPING_LIST_BASE,
  expressjwt({
    secret: process.env.JWT_SECRET ?? "",
    algorithms: ["HS256"],
  }),
  shoppingListRouter
);

export default apiRouter;
