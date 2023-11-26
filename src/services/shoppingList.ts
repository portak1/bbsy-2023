import { IReq, IRes } from "../utils/type";
import validate from "../utils/validation";
import ShoppingList from "../models/shoppingListModel";
// TODO: In future if needed, split this file into multiple files
const jwt = require('jsonwebtoken'); // Import jwt


const getShoppingLists = async (req: IReq, res: IRes) => {
  if (!validate(req, res)) return;

  try {
    const result = await ShoppingList.find();

    if (result) {
      res.status(200).json( result);
    } else {
      res.status(404).json({ message: 'Shopping List not found' });
    }
  } catch (error:any ) {
    res.status(500).json({ message: error.message });
  }

};

const updateShoppingList = async (req: IReq<any>, res: IRes) => {
  if (!validate(req, res)) return;

  try {
    const shoppingListId = req.params.id; 
    const shoppingListUpdates = req.body; 

    const shoppingList = await ShoppingList.findById(shoppingListId);
    if (!shoppingList) {
      return res.status(404).json({ message: 'Shopping List not found' });
    }

    // Update the shopping list's details
    Object.assign(shoppingList, shoppingListUpdates);

    await shoppingList.save();
    res.status(200).json({ message: 'Shopping List updated', shoppingList });
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }

};

const getShoppingList = async (req: IReq<string>, res: IRes) => {
  if (!validate(req, res)) return;

  try {
    const shoppingListId = req.params.id; 
    console.log(shoppingListId);
    const result = await ShoppingList.findById(shoppingListId);

    if (result) {
      res.status(200).json( result );
    } else {
      res.status(404).json({ message: 'Shopping List not found' });
    }
  } catch (error:any ) {
    res.status(500).json({ message: error.message });
  }

};

const deleteShoppingList = async (req: IReq<any>, res: IRes) => {
  if (!validate(req, res)) return;

  try {
    const shoppingListId = req.params.id; 
    console.log(shoppingListId);
    const result = await ShoppingList.findByIdAndDelete(shoppingListId);

    if (result) {
      res.status(200).json({ message: 'Shopping List deleted successfully' });
    } else {
      res.status(404).json({ message: 'Shopping List not found' });
    }
  } catch (error:any ) {
    res.status(500).json({ message: error.message });
  }
};

const createShoppingList = async (req: IReq<string>, res: IRes) => {
  if (!validate(req, res)) return;

  try {
      const token = req.headers.authorization?.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET); 
      
      const userId = decoded.id; 

      const shoppingListData:any = req.body;
      const shoppingList = new ShoppingList({
          ...shoppingListData,
          users: [{ _id: userId, isOwner: true }]
      });
      
      await shoppingList.save();

      res.status(201).json(shoppingList);
  } catch (error:any) {
      res.status(500).json({ message: error.message });
  }
};

const getShoppingListMembers = async (req: IReq<string>, res: IRes) => {
  if (!validate(req, res)) return;

  try {
    const shoppingListId = req.params.id;
    const result = await ShoppingList.findById(shoppingListId);
    if (result) {
      res.status(200).json( result.users );
    } else {
      res.status(404).json({ message: 'Shopping List not found' });
    }

  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
}

const updateMemberInShoppingList = async (req: IReq<any>, res: IRes) => {
  if (!validate(req, res)) return;

  try {
    const shoppingListId = req.params.id;
    const { userId, isOwner } = req.body;

    // Find the shopping list by ID
    const shoppingList = await ShoppingList.findById(shoppingListId);

    if (!shoppingList) {
      return res.status(404).json({ message: 'Shopping List not found' });
    }

    // Find the member in the shopping list's users array and update their isOwner status
    const memberIndex = shoppingList.users.findIndex((user: { _id: { toString: () => any; }; }) => user._id.toString() === userId);
    if (memberIndex === -1) {
      return res.status(404).json({ message: 'Member not found in the shopping list' });
    }

    shoppingList.users[memberIndex].isOwner = isOwner;

    // Save the updated shopping list
    await shoppingList.save();

    res.status(200).json({ message: 'Member updated in the shopping list', shoppingList });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}



const addMemberToShoppingList = async (req: IReq<any>, res: IRes) => {
  if (!validate(req, res)) return;

  try {
    const shoppingListId = req.params.id;
    
    const {userId, isOwner} = req.body;

    const shoppingList = await ShoppingList.findById(shoppingListId);

    if (!shoppingList) {
      return res.status(404).json({ message: 'Shopping List not found' });
    }

    const isMemberAlready = shoppingList.users.some((user: { _id: { toString: () => any; }; }) => user._id.toString() === userId);

    if (isMemberAlready) {
      return res.status(400).json({ message: 'User is already a member of this shopping list' });
    }

    shoppingList.users.push({ _id: userId, isOwner: isOwner ?? false }); 

    await shoppingList.save();

    res.status(200).json({ message: 'Member added to the shopping list', shoppingList });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMemberFromShoppingList = async (req: IReq<any>, res: IRes) => {
  if (!validate(req, res)) return;

  try {
    const shoppingListId = req.params.id;
    const userId = req.body.userId; 
    const shoppingList = await ShoppingList.findById(shoppingListId);

    if (!shoppingList) {
      return res.status(404).json({ message: 'Shopping List not found' });
    }

    const isMember = shoppingList.users.some((user: { _id: { toString: () => string; }; }) => user._id.toString() === userId);

    if (!isMember) {
      return res.status(400).json({ message: 'User is not a member of this shopping list' });
    }

    shoppingList.users = shoppingList.users.filter((user: { _id: { toString: () => any; }; }) => user._id.toString() !== userId);

    await shoppingList.save();

    res.status(200).json({ message: 'Member removed from the shopping list', shoppingList });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

const deleteItemFromShoppingList = async (req: IReq<any>, res: IRes) => {
  if (!validate(req, res)) return;

  try {
    const shoppingListId = req.params.id;
    const itemId = req.params.itemId; // Assuming the item ID is passed as a URL parameter

    const shoppingList = await ShoppingList.findById(shoppingListId);
    if (!shoppingList) {
      return res.status(404).json({ message: 'Shopping List not found' });
    }

    // Remove the item from the shopping list's items array
    shoppingList.items = shoppingList.items.filter((item: { _id: { toString: () => string; }; }) => item._id.toString() !== itemId);

    await shoppingList.save();
    res.status(200).json({ message: 'Item deleted from the shopping list', shoppingList });
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
}

const updateItemInShoppingList = async (req: IReq<any>, res: IRes) => {
  if (!validate(req, res)) return;

  try {
    const shoppingListId = req.params.id;
    const itemId = req.params.itemId; // Assuming the item ID is passed as a URL parameter
    const itemUpdates = req.body; // Assuming the new item data is sent in the request body

    const shoppingList = await ShoppingList.findById(shoppingListId);
    if (!shoppingList) {
      return res.status(404).json({ message: 'Shopping List not found' });
    }

    // Find the item and update its details
    const item = shoppingList.items.id(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found in the shopping list' });
    }

    Object.assign(item, itemUpdates);

    await shoppingList.save();
    res.status(200).json({ message: 'Item updated in the shopping list', shoppingList });
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
}

const getItemsFromShoppingList = async (req: IReq<string>, res: IRes) => {
  if (!validate(req, res)) return;

  try {
    const shoppingListId = req.params.id;
    const result = await ShoppingList.findById(shoppingListId);
    if (result) {
      res.status(200).json( result.items );
    } else {
      res.status(404).json({ message: 'Shopping List not found' });
    }

  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
}

const addItemToShoppingList = async (req: IReq<any>, res: IRes) => {
  if (!validate(req, res)) return;

  try {
    const shoppingListId = req.params.id; // Assuming the shopping list ID is passed as a URL parameter
    const itemData = req.body; // Assuming item data is sent in the request body

    // Find the shopping list by ID
    const shoppingList = await ShoppingList.findById(shoppingListId);

    if (!shoppingList) {
      return res.status(404).json({ message: 'Shopping List not found' });
    }

    // Add the new item to the shopping list's items array
    shoppingList.items.push(itemData);

    // Save the updated shopping list
    await shoppingList.save();

    res.status(200).json({ message: 'Item added to the shopping list', shoppingList });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getShoppingList,
  getShoppingLists,
  createShoppingList,
  addMemberToShoppingList,
  deleteShoppingList,
  deleteMemberFromShoppingList,
  getShoppingListMembers,
  addItemToShoppingList,
  getItemsFromShoppingList,
  updateItemInShoppingList,
  deleteItemFromShoppingList,
  updateMemberInShoppingList,
  updateShoppingList
};
