import ShoppingList from "../models/shoppingListModel";
import { deleteShoppingList } from "../services/shoppingList";

jest.mock('../models/shoppingListModel');

describe('deleteShoppingList', () => {
  const mockReq = {
    params: { id: 'someId' }
  };
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };

  it('should return 200 if the shopping list is successfully deleted', async () => {
    ShoppingList.findByIdAndDelete.mockResolvedValue('deletedShoppingList');
    await deleteShoppingList(mockReq as any, mockRes as any);
    expect(mockRes.status).toHaveBeenCalledWith(200);
  });

  it('should return 404 if the shopping list is not found', async () => {
    ShoppingList.findByIdAndDelete.mockResolvedValue(null);
    await deleteShoppingList(mockReq as any, mockRes as any);
    expect(mockRes.status).toHaveBeenCalledWith(404);
  });

  it('should handle errors', async () => {
    const error = new Error('Failed');
    ShoppingList.findByIdAndDelete.mockRejectedValue(error);
    await deleteShoppingList(mockReq as any, mockRes as any);
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ message: error.message });
  });
});
