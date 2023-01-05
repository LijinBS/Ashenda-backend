/* eslint-disable no-unused-expressions */

const { omit } = require('lodash');
const UserModel = require('../../models/UserModel');

const {
  STATUS_CODE: { OK, INTERNAL_SERVER_ERROR, UNAUTHORIZED },
  RESPONSE_MESSAGE,
} = require('../../constants/response-constant');

const { responseGenerator } = require('../../helpers/response-helper');
const { generateHash, checkHash } = require('../../helpers/auth-helper');

const register = async (req, res) => {
  const sendResponse = responseGenerator(res);
  try {
    const reqBody = req.body;
    const password = await generateHash(reqBody.password);
    const regPayload = { ...reqBody, password };
    const userInfo = await UserModel.create(regPayload);
    sendResponse(OK, RESPONSE_MESSAGE.REG_USER_SUCCESS, '', userInfo);
  } catch (error) {
    sendResponse(OK, RESPONSE_MESSAGE.REG_USER_FAILED, error.message);
  }
};

const login = async (req, res) => {
  const sendResponse = responseGenerator(res);
  try {
    const { email, password } = req.body;
    const loginInfo = await UserModel.findOne({ email }, [
      'name',
      'email',
      'password',
    ]);
    if (loginInfo) {
      const isMatch = await checkHash(password, loginInfo.password);
      if (isMatch) {
        const result = omit(loginInfo.toJSON(), ['password']);
        sendResponse(OK, RESPONSE_MESSAGE.LOGIN_SUCCESS, '', result);
      } else {
        sendResponse(UNAUTHORIZED, RESPONSE_MESSAGE.LOGIN_AUTH);
      }
    } else {
      sendResponse(UNAUTHORIZED, RESPONSE_MESSAGE.LOGIN_FAILED);
    }
  } catch (error) {
    sendResponse(
      INTERNAL_SERVER_ERROR,
      RESPONSE_MESSAGE.LOGIN_FAILED,
      error.message
    );
  }
};

const logout = async (req, res) => {
  try {
    res.send('register api');
  } catch (error) {
    res.send('error');
  }
};

const refreshToken = async (req, res) => {
  try {
    res.send('refreshToken');
  } catch (error) {
    res.send('error');
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
  refreshToken,
  forgetPassword,
  verifyEmail,
};
