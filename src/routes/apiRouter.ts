import { Router } from "express";
import Paths from "./paths";

import {
  itemToShoppingListValidation,
  createShoppingListValidation,
  addMemberToShoppingListValidation,
  getShoppingListValidation,
  deleteShoppingListValidation,
  removeMemberFromShoppingListValidation,
  getItemsFromShoppingListValidation,
  removeItemFromShoppingListValidation,
  updateItemInShoppingListValidation,
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
  getShoppingListMembers,
  getItemsFromShoppingList,
  deleteItemFromShoppingList,
  updateItemInShoppingList,
  updateMemberInShoppingList,
  updateShoppingList
} from "../services/shoppingList";
import { login, register } from "../services/authorize";

dotenv.config();

const apiRouter = Router({});

apiRouter.use(
  Paths.Base,
  expressjwt({
    secret: process.env.JWT_SECRET ?? "",
    algorithms: ["HS256"],
  }),
  getShoppingLists
);



const authRouter = Router();

authRouter.post(Paths.Auth.Register, authValidation, register);
authRouter.post(Paths.Auth.Login, authValidation, login);

apiRouter.use(Paths.Auth.Base, authRouter);

const shoppingListRouter = Router();
shoppingListRouter.get(Paths.ShoppingList.Get ,getShoppingListValidation, getShoppingList);

shoppingListRouter.get("", getShoppingLists);

shoppingListRouter.delete(
  Paths.ShoppingList.Delete,
  deleteShoppingListValidation,
  deleteShoppingList
);

shoppingListRouter.patch(
  Paths.ShoppingList.Patch,
  createShoppingListValidation,
  updateShoppingList
);

shoppingListRouter.post("", createShoppingListValidation, createShoppingList);


//MEMBERS
const shoppingListMembersRouter = Router({mergeParams: true});

shoppingListMembersRouter.get(
  Paths.ShoppingList.Members.Get,
  getShoppingListValidation,
  getShoppingListMembers
);

shoppingListMembersRouter.delete(
  Paths.ShoppingList.Members.Delete,
  removeMemberFromShoppingListValidation,
  deleteMemberFromShoppingList
);

shoppingListMembersRouter.post(
  Paths.ShoppingList.Members.Create,
  addMemberToShoppingListValidation,
  addMemberToShoppingList
);

shoppingListMembersRouter.patch(
  Paths.ShoppingList.Members.Patch,
  addMemberToShoppingListValidation,
  updateMemberInShoppingList
);

shoppingListRouter.use(Paths.ShoppingList.Members.Base, shoppingListMembersRouter);

//ITEMS
const shoppingListItemsRouter = Router({mergeParams: true});

shoppingListItemsRouter.get(
  Paths.ShoppingList.Items.Get,
  getItemsFromShoppingListValidation,
  getItemsFromShoppingList
);

shoppingListItemsRouter.delete(
  Paths.ShoppingList.Items.Delete,
  removeItemFromShoppingListValidation,
  deleteItemFromShoppingList
);

shoppingListItemsRouter.post(
  Paths.ShoppingList.Items.Create,
  itemToShoppingListValidation,
  addItemToShoppingList
);

shoppingListItemsRouter.patch(
  Paths.ShoppingList.Items.Patch,
  updateItemInShoppingListValidation,
  updateItemInShoppingList
);

shoppingListRouter.use(Paths.ShoppingList.Items.Base, shoppingListItemsRouter);

apiRouter.use(
  Paths.ShoppingList.Base,
  expressjwt({
    secret: process.env.JWT_SECRET ?? "",
    algorithms: ["HS256"],
  }),
  shoppingListRouter
);

export default apiRouter;
