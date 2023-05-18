import fridge from '../server/controllers/fridgeController';
import db from '../server/models/inventoryModels';
describe('FridgeController', () => {
  const item = {
    id: 1,
    date_bought: '12/1/2022',
    expiration: '12/30/2022',
    item_name: 'PIZZA',
    quantity: 1,
  };
  const req = { body: item, user:{userId:'TEST_USER'} };
  const res = { locals: {} };
  const next = jest.fn();
  
  const insertRegex = new RegExp('^INSERT', 'i');
  const selectRegex = new RegExp('^SELECT', 'i');
  const updateRegex = new RegExp('^UPDATE', 'i');
  const deleteRegex = new RegExp('^DELETE', 'i');

  const mockQuery = jest.spyOn(db, 'query');
  mockQuery.mockImplementation(() =>
    Promise.resolve({
      rows: [item],
    })
  );

  beforeEach(() => jest.clearAllMocks());
  
  describe('getItems', () => {
    it('stores the return of db.query in res.locals', async () => {
      await fridge.getItems(req, res, next);
      expect(res.locals.inventory).toStrictEqual([item]);
    });

    it('calls db.query', async () => {
      await fridge.getItems(req, res, next);
      expect(mockQuery).toBeCalled();
    });

    it('calls the next function', async () => {
      await fridge.getItems(req, res, next);
      expect(next).toBeCalled();
    });
  });

  describe('verifyItem', () => {
    it('calls a select query with a second parameter of the item name within request body', async () => {
      await fridge.verifyItem(req, res, next);
      expect(mockQuery).toHaveBeenNthCalledWith(
        1,
        expect.stringMatching(selectRegex),
        [req.body.item_name]
      );
    });

    it('calls an insert query if an item is not in the item table', async () => {
      mockQuery.mockReturnValueOnce(
        Promise.resolve({
          rows: [{ count: '0' }],
        })
      );

      await fridge.verifyItem(req, res, next);
      expect(mockQuery).toBeCalledTimes(2);
      expect(mockQuery).toHaveBeenNthCalledWith(
        2,
        expect.stringMatching(insertRegex),
        [req.body.item_name]
      );
    });

    it('does not call an insert query if an item is already in the item table', async () => {
      mockQuery.mockReturnValueOnce(
        Promise.resolve({
          rows: [{ count: '1' }],
        })
      );

      await fridge.verifyItem(req, res, next);
      expect(mockQuery).toBeCalledTimes(1);
      expect(mockQuery).not.toHaveBeenCalledWith(
        expect.stringMatching(insertRegex)
      );
    });

    it('returns an invocation of the next function', async () => {
      const returnVal = await fridge.verifyItem(req, res, next);
      expect(next).toBeCalledTimes(1);
      expect(returnVal).toBe(undefined);
    });
  });

  describe('addItem', () => {
    it('calls an insert query', async () => {
      await fridge.addItem(req, res, next);
      expect(mockQuery).toBeCalledTimes(1);
      expect(mockQuery).toHaveBeenNthCalledWith(
        1,
        expect.stringMatching(insertRegex),
        expect.anything()
      );
    });

    it('calls query with array of item parameters from req.body as second argument', async () => {
      await fridge.addItem(req, res, next);
      expect(mockQuery).toHaveBeenNthCalledWith(1, expect.anything(), [
        item.item_name,
        item.expiration,
        item.date_bought,
        item.quantity,
        req.user.userId
      ]);
    });

    it('returns an invocation of the next function', async () => {
      const returnVal = await fridge.verifyItem(req, res, next);
      expect(next).toBeCalledTimes(1);
      expect(returnVal).toBe(undefined);
    });
  });

  describe('updateItem', () => {
    it('calls an update query', async () => {
      await fridge.updateItem(req, res, next);
      expect(mockQuery).toBeCalledTimes(1);
      expect(mockQuery).toHaveBeenNthCalledWith(
        1,
        expect.stringMatching(updateRegex),
        expect.anything()
      );
    });

    it('calls query with array of item parameters from req.body as second argument', async () => {
      await fridge.updateItem(req, res, next);
      expect(mockQuery).toHaveBeenNthCalledWith(1, expect.anything(), [
        item.id,
        item.expiration,
        item.date_bought,
        item.quantity,
        req.user.userId
      ]);
    });

    it('returns an invocation of the next function', async () => {
      const returnVal = await fridge.updateItem(req, res, next);
      expect(next).toBeCalledTimes(1);
      expect(returnVal).toBe(undefined);
    });
  });

  describe('deleteItem', () => {
    it('calls a delete query', async () => {
      await fridge.deleteItem(req, res, next);
      expect(mockQuery).toBeCalledTimes(1);
      expect(mockQuery).toHaveBeenNthCalledWith(
        1,
        expect.stringMatching(deleteRegex),
        expect.anything()
      );
    });

    it('calls query with array of item parameters from req.body as second argument', async () => {
      await fridge.deleteItem(req, res, next);
      expect(mockQuery).toHaveBeenNthCalledWith(1, expect.anything(), [
        item.id,req.user.userId
      ], );
    });

    it('returns an invocation of the next function', async () => {
      const returnVal = await fridge.deleteItem(req, res, next);
      expect(next).toBeCalledTimes(1);
      expect(returnVal).toBe(undefined);
    });
  });
});
