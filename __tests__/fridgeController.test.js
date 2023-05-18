import fridge from '../server/controllers/fridgeController';
import db from '../server/models/inventoryModels'
describe('FridgeController', () => {
  const res = { sendStatus: jest.fn(), locals:{} };
  const next = jest.fn();


  describe('getItems', () => {
    it('stores a list of items in res.locals', async () => {
      const item = {
        date_bought: '12-1-2022',
        expiration: '12-30-2022',
        item_name: 'pizza',
      };

      const mock = jest.spyOn(db, 'query');
      mock.mockImplementation(() =>
        Promise.resolve({
          rows: [item],
        })
      );
      await fridge.getItems({}, res, next);
      console.log(res.locals.inventory);
      expect(res.locals).toBe(item);
    });
  });
});
