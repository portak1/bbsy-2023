import ShoppingList from '../models/shoppingListModel';
import { updateShoppingList } from '../services/shoppingList'; 

jest.mock('../models/shoppingListModel');

describe('updateShoppingList', () => {
  const mockReq = {
    params: { id: 'someId' },
    body: { updateData: 'data' }
  };
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };

  it('should return 200 and the updated shopping list', async () => {
    ShoppingList.findById.mockResolvedValue({
      ...mockReq.body,
      save: jest.fn().mockResolvedValue('updatedShoppingList')
    });
    await updateShoppingList(mockReq as any, mockRes as any);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith('updatedShoppingList');
  });

  it('should return 404 if the shopping list is not found', async () => {
    ShoppingList.findById.mockResolvedValue(null);
    await updateShoppingList(mockReq as any, mockRes as any);
    expect(mockRes.status).toHaveBeenCalledWith(404);
  });

  it('should handle errors', async () => {
    const error = new Error('Failed');
    ShoppingList.findById.mockRejectedValue(error);
    await updateShoppingList(mockReq as any, mockRes as any);
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ message: error.message });
  });
});
