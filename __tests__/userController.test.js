import user from '../server/controllers/userController';
import db from '../server/models/inventoryModels';
const bcrypt = require('bcryptjs');

describe('UserController', () => {
  const userStore = {
    username: 'TEST_USER',
    password: '1234'
  };
  const req = { body: userStore };
  const res = { locals: {} };
  const next = jest.fn();

  const mockQuery = jest.spyOn(db, 'query');
  mockQuery.mockImplementation(() =>
    Promise.resolve({
      rows: [userStore],
    })
  );

  const insertRegex = new RegExp('^INSERT', 'i');
  const selectRegex = new RegExp('^SELECT', 'i');
  const updateRegex = new RegExp('^UPDATE', 'i');
  const deleteRegex = new RegExp('^DELETE', 'i');

  beforeEach(() => jest.clearAllMocks());

  describe('registerUser', () => {
    it('stores the return of db.query in res.locals', async () => {
      await user.registerUser(req, res, next);
      expect(res.locals.user).toStrictEqual(userStore);
    });

    it('calls db.query', async () => {
      await user.registerUser(req, res, next);
      expect(mockQuery).toBeCalled();
    });

    it('calls the next function', async () => {
      await user.registerUser(req, res, next);
      expect(next).toBeCalled();
    });
  });

});