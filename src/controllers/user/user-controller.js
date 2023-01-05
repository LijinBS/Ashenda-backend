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
      'phone',
      'isEmailVerified',
      'isPhoneVerified',
      'location',
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
    const reqBody = req.body;
    const userInfo = await UserModel.updateOne({ _id: userId }, reqBody);
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
