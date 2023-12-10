import ShoppingList from "../models/shoppingListModel";
import { getShoppingList } from "../services/shoppingList"; 

jest.mock('../models/shoppingListModel');

describe('getShoppingList', () => {
  const mockReq = {
    params: { id: 'someId' }
  };
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };

  it('should return 200 and the requested shopping list', async () => {
    ShoppingList.findById.mockResolvedValue('shoppingList');
    await getShoppingList(mockReq as any, mockRes as any);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith('shoppingList');
  });

  it('should return 404 if the shopping list is not found', async () => {
    ShoppingList.findById.mockResolvedValue(null);
    await getShoppingList(mockReq as any, mockRes as any);
    expect(mockRes.status).toHaveBeenCalledWith(404);
  });

  it('should handle errors', async () => {
    const error = new Error('Failed');
    ShoppingList.findById.mockRejectedValue(error);
    await getShoppingList(mockReq as any, mockRes as any);
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ message: error.message });
  });
});
