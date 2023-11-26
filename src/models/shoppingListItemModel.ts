const mongoose = require('mongoose');
export const ShoppingListItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    completed: { type: Boolean, default: false },
    itemCount: { type: Number, default: 1 },
});

