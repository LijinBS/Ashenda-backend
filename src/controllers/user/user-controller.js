const UserModel = require('../../models/UserModel');

const {
  STATUS_CODE: { OK, INTERNAL_SERVER_ERROR },
  RESPONSE_MESSAGE,
} = require('../../constants/response-constant');

const { responseGenerator } = require('../../helpers/response-helper');

const getProfile = async (req, res) => {
  const sendResponse = responseGenerator(res);
  try {
    const { userId } = req.params;
    const userInfo = await UserModel.findOne({ _id: userId }, [
      'name',
      'email',
      'phone.code',
      'phone.number',
      'userType',
      'isEmailVerified',
      'isPhoneVerified',
      'city',
      'state',
      'country',
      'profileImg',
    ]);
    sendResponse(OK, '', '', userInfo);
  } catch (error) {
    sendResponse(INTERNAL_SERVER_ERROR, RESPONSE_MESSAGE.PROFILE_UPDATE_FAILED);
  }
};

const updateProfile = async (req, res) => {
  const sendResponse = responseGenerator(res);
  try {
    const { userId } = req.params;
    const { name, phone, profileImg, city, state, country } = req.body;
    const updatePayload = { name, phone, profileImg, city, state, country };
    const userInfo = await UserModel.updateOne({ _id: userId }, updatePayload);
    sendResponse(OK, RESPONSE_MESSAGE.PROFILE_UPDATE_SUCCESS, '', userInfo);
  } catch (error) {
    sendResponse(INTERNAL_SERVER_ERROR, RESPONSE_MESSAGE.PROFILE_UPDATE_FAILED);
  }
};

const changePassword = async (req, res) => {
  try {
    res.send('changePassword api');
  } catch (error) {
    res.send('error');
  }
};
module.exports = { getProfile, updateProfile, changePassword };
