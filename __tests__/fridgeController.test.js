import fridge from '../server/controllers/fridgeController';
import db from '../server/models/inventoryModels';
describe('FridgeController', () => {
  const next = jest.fn();
  const res = { locals: {} };
  beforeEach(() => jest.clearAllMocks());
  describe('getItems', () => {
    const item = {
      date_bought: '12/1/2022',
      expiration: '12/30/2022',
      item_name: 'PIZZA',
    };

    const mockQuery = jest.spyOn(db, 'query');
    mockQuery.mockImplementation(() =>
      Promise.resolve({
        rows: [item],
      })
    );

    

    it('stores the return of db.query in res.locals', async () => {
      await fridge.getItems({}, res, next);
      expect(res.locals.inventory).toStrictEqual([item]);
    });

    it('calls db.query', async () => {
      await fridge.getItems({}, res, next);
      expect(mockQuery).toBeCalled();
    });

    it('calls the next function', async () => {
      await fridge.getItems({}, res, next);
      expect(next).toBeCalled();
    });
  });

  describe('verifyItem', () => {
    const item = {
      date_bought: '12/1/2022',
      expiration: '12/30/2022',
      item_name: 'PIZZA',
    };
    const mockQuery = jest.spyOn(db, 'query');
    const req = {body:item};
    const selectRegex = new RegExp('^SELECT', 'i');
    const insertRegex = new RegExp('^INSERT', 'i');
    
    it('calls a select query with a second parameter of the item name within request body', async () => {
      await fridge.verifyItem(req, res, next);
      expect(mockQuery).toHaveBeenNthCalledWith(1, expect.stringMatching(selectRegex), [req.body.item_name]);
    });

    it('calls an insert query if an item is not in the item table', async () => {
      mockQuery.mockReturnValueOnce(
        Promise.resolve({
          rows:[{count:'0'}],
        })
      );

      await fridge.verifyItem(req, res, next);
      expect(mockQuery).toBeCalledTimes(2);
      expect(mockQuery).toHaveBeenNthCalledWith(2, expect.stringMatching(insertRegex), [req.body.item_name]);
    });

    it('does not call an insert query if an item is already in the item table', async () => {
      mockQuery.mockReturnValueOnce(
        Promise.resolve({
          rows:[{count:'1'}],
        })
      );

      await fridge.verifyItem(req, res, next);
      expect(mockQuery).toBeCalledTimes(1);
      expect(mockQuery).not.toHaveBeenCalledWith(expect.stringMatching(insertRegex));
    });

    it('returns an invocation of the next function', async () => {

      const returnVal = await fridge.verifyItem(req, res, next);
      expect(next).toBeCalledTimes(1);
      expect(returnVal).toBe(undefined);
    });
  });

  describe('addItem', () => {
    const item = {
      date_bought: '12/1/2022',
      expiration: '12/30/2022',
      item_name: 'PIZZA',
    };
    const mockQuery = jest.spyOn(db, 'query');
    const req = {body:item};
    const insertRegex = new RegExp('^INSERT', 'i');

    it('calls an insert query', async () => {
      // await fridge.verifyItem(req, res, next);
      // expect(mockQuery).toBeCalledTimes(1);
      // expect(mockQuery.mock.calls[0][0]).toMatch(insertRegex);
    });

    it('calls query with array of item parameters from req.body as second argument', async () => {

    });

    it('returns an invocation of the next function', async () => {

    });
  });
});
