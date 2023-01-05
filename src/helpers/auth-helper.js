const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { nanoid } = require('nanoid');

const saltRounds = 10;

const generateHash = async (text) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hasPwd = await bcrypt.hash(text, salt);
  return hasPwd;
};

const checkHash = async (plainTxt, hashPwd) => {
  const isMatch = await bcrypt.compare(plainTxt, hashPwd);
  return isMatch;
};

const getAccessToken = async (payload) => {
  // const tokenId = nanoid(16);
  // const text = `Access_${tokenId}`;
  // const typeId = await generateHash(text);
  // const accessTokenPayload = {
  //   type_id: typeId,
  //   token_id: tokenId,
  //   ...payload,
  // };
  // const accessToken = await jwt.sign(
  //   accessTokenPayload,
  //   process.env.ACCESS_TOKEN_SECRET,
  //   {
  //     algorithm: 'HS256',
  //     expiresIn: process.env.ACCESS_TOKEN_LIFE,
  //   }
  // );
  // return `Access ${accessToken}`;
};

const getRefreshToken = async (payload) => {
  // const tokenId = nanoid(16);
  // const text = `Refresh_${tokenId}`;
  // const typeId = await generateHash(text);
  // const refreshTokenPayload = {
  //   type_id: typeId,
  //   token_id: tokenId,
  //   ...payload,
  // };
  // const refreshToken = await jwt.sign(
  //   refreshTokenPayload,
  //   process.env.REFRESH_TOKEN_SECRET,
  //   {
  //     algorithm: 'HS256',
  //     expiresIn: process.env.REFRESH_TOKEN_LIFE,
  //   }
  // );
  // return `Refresh ${refreshToken}`;
};

const verifyToken = async (token, type = 'AT') => {
  const secretKey =
    type === 'AT' ? 'ACCESS_TOKEN_SECRET' : 'REFRESH_TOKEN_SECRET';
  let userData;
  try {
    userData = await jwt.verify(token, process.env[secretKey]);
  } catch (error) {
    userData = null;
  }
  return userData;
};

module.exports = {
  generateHash,
  checkHash,
  getAccessToken,
  getRefreshToken,
  verifyToken,
};
