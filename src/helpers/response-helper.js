/* eslint-disable indent */
const {
  STATUS_CODE,
  RESPONSE_MESSAGE,
  STATUS,
} = require('../constants/response-constant');

const errorMessageParse = (errorMsg) => {
  let parsedErrorMessage = '';
  if (errorMsg.includes('duplicate key error')) {
    parsedErrorMessage =
      errorMsg.includes('email') && RESPONSE_MESSAGE.REG_USER_EMAIL_EXITS;
  }
  return parsedErrorMessage;
};

const responseGenerator =
  (res) =>
  (statusCode = STATUS_CODE.OK, mes = '', errMes = '', data = '') => {
    const message = errMes ? errorMessageParse(errMes) : mes;
    res.status(statusCode).send({
      status: STATUS_CODE.OK ? STATUS.SUCCESS : STATUS.FAILED,
      message,
      data,
    });
  };

module.exports = { responseGenerator };
