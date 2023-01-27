/* eslint-disable indent */
const {
  STATUS_CODE,
  RESPONSE_MESSAGE,
  STATUS,
} = require('../constants/response-constant');

/**
 * Parse the error message.
 * @function errorMessageParse
 * @param {string} errorMsg - Error Message.
 */
const errorMessageParse = (errorMsg) => {
  let parsedErrorMessage = errorMsg;
  if (errorMsg.includes('duplicate key error')) {
    parsedErrorMessage =
      errorMsg.includes('email') && RESPONSE_MESSAGE.REG_USER_EMAIL_EXITS;
  }
  return parsedErrorMessage;
};

/**
 * Response Generator.
 * @function responseGenerator
 * @param {string} statusCode - Status Code.
 * @param {string} mes - Message.
 * @param {string} errMes - Error Message.
 * @param {string} data - Data.
 */
const responseGenerator =
  (res) =>
  (statusCode = STATUS_CODE.OK, mes = '', errMes = '', data = '') => {
    const message = errMes ? errorMessageParse(errMes) : mes;
    res.status(statusCode).send({
      status: statusCode === STATUS_CODE.OK ? STATUS.SUCCESS : STATUS.FAILED,
      message,
      data,
    });
  };

module.exports = { responseGenerator };
