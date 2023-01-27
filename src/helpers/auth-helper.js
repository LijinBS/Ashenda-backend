const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { customAlphabet } = require('nanoid');

const {
  TOKEN_TYPES,
  TOKEN_SECRET_MAPPER,
  TOKEN_LIFE_TIME_MAPPER,
  SALT_ROUNDS,
  JWT_ALG,
} = require('../constants/auth-constant');

/**
 * Generate Hash Password from Text.
 * @function generateHash
 * @param {string} text - Plain Text.
 */
const generateHash = async (text) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hasPwd = await bcrypt.hash(text, salt);
  return hasPwd;
};

/**
 * Verify Hash Password with Plain Text Password.
 * @function checkHash
 * @param {string} plainTxt - Plain Text Password.
 * @param {string} hashPwd - Hash Password.
 */
const checkHash = async (plainTxt, hashPwd) => {
  const isMatch = await bcrypt.compare(plainTxt, hashPwd);
  return isMatch;
};

/**
 * Generate Token with Payload.
 * @function generateToken
 * @param {object} payload - Payload to generate token.
 * @param {string} type - Token type ['Access','Refresh'].
 * @return {string} - Generated token
 */
const generateToken = async (payload, type) => {
  const secretKey = process.env[TOKEN_SECRET_MAPPER[type]];
  const typeId = customAlphabet('1234567890abcdef6521', 24)();
  const token = await jwt.sign({ ...payload, typeId }, secretKey, {
    algorithm: JWT_ALG,
    expiresIn: process.env[TOKEN_LIFE_TIME_MAPPER[type]],
  });
  return token;
};

/**
 * Verify Existing Token.
 * @function verifyToken
 * @param {string} token - Token for verify.
 * @param {string} type - Token type ['Access','Refresh'].
 * @return {object | null} - Verify the token return data or null
 */
const verifyToken = async (token, type) => {
  const secretKey = process.env[TOKEN_SECRET_MAPPER[type]];
  let userData;
  try {
    userData = await jwt.verify(token, secretKey);
  } catch (error) {
    userData = null;
  }
  return userData;
};

/**
 * Generate Both Access and RefreshToken With Payload.
 * @function generateAccessAndRefreshToken
 * @param {string} payload - Payload to generate token.
 * @return {object} - Generated tokens will return
 */
const generateAccessAndRefreshToken = async (payload) => {
  const accessToken = await generateToken(payload, TOKEN_TYPES.ACCESS_TOKEN);
  const refreshToken = await generateToken(payload, TOKEN_TYPES.REFRESH_TOKEN);
  return {
    access: `Access ${accessToken}`,
    refresh: `Refresh ${refreshToken}`,
  };
};

module.exports = {
  generateHash,
  checkHash,
  verifyToken,
  generateToken,
  generateAccessAndRefreshToken,
};
