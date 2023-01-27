const TokenModel = require('../../models/TokenModel');

const addTokenBlockList = async (payload = {}) => {
  await TokenModel.create(payload);
};

const checkTokenIsBlocked = async (userId, token) => {
  const tokenInfo = await TokenModel.findOne({
    userId,
    token,
    isBlocked: true,
  });
  return !!tokenInfo;
};

module.exports = { addTokenBlockList, checkTokenIsBlocked };
