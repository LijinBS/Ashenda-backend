const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    userType: {
      type: String,
      default: 'USER',
    },
    profileImg: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      default: '',
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
    location: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

// eslint-disable-next-line func-names
// UserSchema.pre('save', function (next) {
//   this.password = '123';
//   next();
// });

module.exports = model('User', UserSchema);
