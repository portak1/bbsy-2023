import { getShoppingLists } from '../services/shoppingList'; 
import ShoppingList from '../models/shoppingListModel';

jest.mock('../models/shoppingListModel');

describe('getShoppingLists', () => {
  const mockReq = {};
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };

  it('should return 200 and a list of shopping lists', async () => {
    ShoppingList.find.mockResolvedValue(['list1', 'list2']);
    await getShoppingLists(mockReq as any, mockRes as any);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(['list1', 'list2']);
  });

  it('should return 404 if no shopping lists are found', async () => {
    ShoppingList.find.mockResolvedValue(null);
    await getShoppingLists(mockReq as any, mockRes as any);
    expect(mockRes.status).toHaveBeenCalledWith(404);
  });

  it('should handle errors', async () => {
    const error = new Error('Failed');
    ShoppingList.find.mockRejectedValue(error);
    await getShoppingLists(mockReq as any, mockRes as any);
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ message: error.message });
  });
});
