import authenticate from '../server/controllers/authenticateToken';
const jwt = require('jsonwebtoken');

describe('AuthenticateToken controller', () => {

  const res = { sendStatus: jest.fn() };
  const next = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  describe('invalid token', () => {
    const req = {
      headers: { Authorization: 'Bearer 1234' },
    };

    it('should send a status 400', () => {
      authenticate(req, res, next);
      expect(res.sendStatus.mock.calls[0][0]).toBe(400);
    });

    it('should not call the next function', () => expect(next).toBeCalledTimes(0));
  });

  describe('valid token', () => {
    const testUser = {userId: 'user1'}
    const token = jwt.sign(testUser, process.env.JWT_SECRET, {expiresIn:'1h'});
    const req = {
      headers: { authorization: `Bearer ${token}` },
    };

    it('should attach a decoded user to the request object', async () => {
      authenticate(req, res, next);
      expect(req.user.userId).toBe(testUser.userId);
    });

    it('should call the next function upon completion', () => {
      authenticate(req, res, next);
      expect(next).toBeCalled();
    });
  });
});
