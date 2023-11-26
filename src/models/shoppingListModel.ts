import { ShoppingListItemSchema } from "./shoppingListItemModel";
const mongoose = require('mongoose');
const ShoppingListSchema = new mongoose.Schema({
    name: { type: String, required: true },
    items: [ShoppingListItemSchema],
    users: [{
        _id: { type: mongoose.Schema.Types.ObjectId, required: true },
        isOwner: { type: Boolean, required: true }
    }]
});

const ShoppingList = mongoose.model('ShoppingList', ShoppingListSchema);
export default ShoppingList;
