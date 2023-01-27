/* eslint-disable no-unused-expressions */
const { omit } = require('lodash');
const UserModel = require('../../models/UserModel');
const {
  STATUS_CODE: { OK, INTERNAL_SERVER_ERROR, UNAUTHORIZED },
  RESPONSE_MESSAGE,
} = require('../../constants/response-constant');
const { TOKEN_TYPES } = require('../../constants/auth-constant');
const { responseGenerator } = require('../../helpers/response-helper');
const {
  verifyToken,
  generateHash,
  checkHash,
  generateAccessAndRefreshToken,
} = require('../../helpers/auth-helper');

const logger = require('../../helpers/logger-helper');

const {
  addTokenBlockList,
  checkTokenIsBlocked,
} = require('./token-controller');

const register = async (req, res) => {
  const sendResponse = responseGenerator(res);
  try {
    const reqBody = req.body;
    const password = await generateHash(reqBody.password);
    const regPayload = { ...reqBody, password };
    const userInfo = await UserModel.create(regPayload);
    logger.info(RESPONSE_MESSAGE.REG_USER_SUCCESS);
    sendResponse(OK, RESPONSE_MESSAGE.REG_USER_SUCCESS, '', userInfo.id);
  } catch (error) {
    logger.error(`${RESPONSE_MESSAGE.REG_USER_FAILED} :: ${error.message}`);
    sendResponse(OK, RESPONSE_MESSAGE.REG_USER_FAILED, error.message);
  }
};

const login = async (req, res) => {
  const sendResponse = responseGenerator(res);
  try {
    const { email, password } = req.body;
    const loginInfo = await UserModel.findOne({ email }, [
      'id',
      'name',
      'email',
      'password',
      'userType',
    ]);
    if (loginInfo) {
      const isMatch = await checkHash(password, loginInfo.password);
      if (isMatch) {
        const { id: userId, userType } = loginInfo;
        const payload = omit(loginInfo.toJSON(), ['password', '_id']);
        const tokenPayload = { id: userId, type: userType };
        const token = await generateAccessAndRefreshToken(tokenPayload);
        await sendResponse(OK, RESPONSE_MESSAGE.LOGIN_SUCCESS, '', {
          ...payload,
          userId,
          token,
        });
      } else {
        sendResponse(UNAUTHORIZED, RESPONSE_MESSAGE.LOGIN_AUTH);
      }
    } else {
      sendResponse(UNAUTHORIZED, RESPONSE_MESSAGE.LOGIN_FAILED);
    }
  } catch (error) {
    logger.error(`${RESPONSE_MESSAGE.LOGIN_FAILED} :: ${error.message}`);
    sendResponse(
      INTERNAL_SERVER_ERROR,
      RESPONSE_MESSAGE.LOGIN_FAILED,
      error.message
    );
  }
};

const logout = async (req, res) => {
  const sendResponse = responseGenerator(res);
  try {
    const { authorization = '' } = req.headers;
    const {
      userInfo: { userId },
    } = req;
    const { token } = req.body;
    await addTokenBlockList({
      userId,
      type: TOKEN_TYPES.ACCESS_TOKEN,
      token: authorization,
      isBlocked: true,
    });
    await addTokenBlockList({
      userId,
      type: TOKEN_TYPES.REFRESH_TOKEN,
      token,
      isBlocked: true,
    });
    await sendResponse(OK, RESPONSE_MESSAGE.LOGOUT_SUCCESS, '');
  } catch (error) {
    sendResponse(
      INTERNAL_SERVER_ERROR,
      RESPONSE_MESSAGE.LOGOUT_FAILED,
      error.message
    );
  }
};

// eslint-disable-next-line consistent-return
const refresh = async (req, res) => {
  const sendResponse = responseGenerator(res);
  try {
    const { refToken, id: userId } = req.body;
    const isBlockedToken = await checkTokenIsBlocked(userId, refToken);
    if (isBlockedToken) {
      return sendResponse(UNAUTHORIZED, RESPONSE_MESSAGE.UNAUTHORIZED);
    }
    const refreshToken = refToken?.split(' ')[1];
    if (!refreshToken) {
      return sendResponse(UNAUTHORIZED, RESPONSE_MESSAGE.UNAUTHORIZED);
    }
    const tokenDecodeData = await verifyToken(
      refreshToken,
      TOKEN_TYPES.REFRESH_TOKEN
    );
    if (!tokenDecodeData) {
      logger.error(`${RESPONSE_MESSAGE.UNAUTHORIZED} ::`);
      return sendResponse(UNAUTHORIZED, RESPONSE_MESSAGE.UNAUTHORIZED);
    }
    const { id, type } = tokenDecodeData;
    if (userId !== id) {
      return sendResponse(UNAUTHORIZED, RESPONSE_MESSAGE.UNAUTHORIZED);
    }
    await addTokenBlockList({
      userId: id,
      type: TOKEN_TYPES.REFRESH_TOKEN,
      token: refToken,
      isBlocked: true,
    });
    const tokenObj = await generateAccessAndRefreshToken({ id, type });
    sendResponse(OK, RESPONSE_MESSAGE.REFRESH_SUCCESS, '', tokenObj);
  } catch (error) {
    sendResponse(
      INTERNAL_SERVER_ERROR,
      RESPONSE_MESSAGE.REFRESH_FAILED,
      error.message
    );
  }
};

const forgetPassword = async (req, res) => {
  try {
    res.send('forgetPassword');
  } catch (error) {
    res.send('error');
  }
};

const verifyEmail = async (req, res) => {
  try {
    res.send('verifyEmail');
  } catch (error) {
    res.send('error');
  }
};

module.exports = {
  register,
  login,
  logout,
  refresh,
  forgetPassword,
  verifyEmail,
};
