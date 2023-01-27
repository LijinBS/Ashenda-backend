/* eslint-disable func-names */
const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const phNoSchema = new Schema({
  code: {
    type: String,
    default: '',
  },
  number: {
    type: String,
    default: '',
  },
});

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      require: true,
    },
    userType: {
      type: String,
      default: 'EU',
    },
    profileImg: {
      type: String,
      default: '',
    },
    phone: {
      type: phNoSchema,
      default: {
        code: '',
        number: '',
      },
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
    city: {
      type: String,
      default: '',
    },
    state: {
      type: String,
      default: '',
    },
    country: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = model('User', userSchema);
