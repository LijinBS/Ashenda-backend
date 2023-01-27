const { verifyToken } = require('../helpers/auth-helper');
const { responseGenerator } = require('../helpers/response-helper');

const { checkTokenIsBlocked } = require('../controllers/auth/token-controller');

const {
  EXCEPTION_ROUTES,
  PERMISSION_EXCEPTION_ROUTES,
  PERMISSION_METHOD,
  TOKEN_TYPES,
} = require('../constants/auth-constant');
const {
  RESPONSE_MESSAGE,
  STATUS_CODE: { UNAUTHORIZED },
} = require('../constants/response-constant');

// eslint-disable-next-line consistent-return
const authMiddleware = async (req, res, next) => {
  const sendResponse = responseGenerator(res);
  if (!EXCEPTION_ROUTES.includes(req.url)) {
    const { authorization } = req.headers;
    const accessToken = authorization?.split(' ')[1];
    if (!accessToken) {
      return sendResponse(UNAUTHORIZED, RESPONSE_MESSAGE.UNAUTHORIZED);
    }
    const tokenDecodeData = await verifyToken(
      accessToken,
      TOKEN_TYPES.ACCESS_TOKEN
    );

    if (!tokenDecodeData) {
      return sendResponse(UNAUTHORIZED, RESPONSE_MESSAGE.UNAUTHORIZED);
    }
    if (tokenDecodeData) {
      const { id, type } = tokenDecodeData;
      const isBlockedToken = await checkTokenIsBlocked(id, authorization);
      if (isBlockedToken) {
        return sendResponse(UNAUTHORIZED, RESPONSE_MESSAGE.UNAUTHORIZED);
      }
      req.userInfo = { userId: id, userType: type };
    }
  }

  next();
};

module.exports = { authMiddleware };
