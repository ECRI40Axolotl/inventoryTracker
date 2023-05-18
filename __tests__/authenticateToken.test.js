import authenticate from '../server/controllers/authenticateToken';
const jwt = require('jsonwebtoken');

describe('AuthenticateToken controller', () => {

  const res = { sendStatus: jest.fn() };
  const next = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  describe('invalid token', () => {
    const req = {
      cookies: { jwtToken:'1234' },
    };

    it('sends a status 400', () => {
      authenticate(req, res, next);
      expect(res.sendStatus.mock.calls[0][0]).toBe(400);
    });

    it('does not call the next function', () => expect(next).toBeCalledTimes(0));
  });

  describe('valid token', () => {
    const testUser = {userId: 'user1'}
    const token = jwt.sign(testUser, process.env.JWT_SECRET, {expiresIn:'1h'});
    const req = {
      cookies: { jwtToken: token },
    };

    it('attaches a decoded user to the request object', async () => {
      authenticate(req, res, next);
      expect(req.user.userId).toBe(testUser.userId);
    });

    it('calls the next function upon completion', () => {
      authenticate(req, res, next);
      expect(next).toBeCalled();
    });
  });
});
