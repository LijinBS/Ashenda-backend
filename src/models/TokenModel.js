const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const tokenSchema = new Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    type: {
      type: String,
      require: true,
    },
    token: {
      type: String,
      require: true,
    },
    expires: {
      type: Date,
      required: false,
    },
    isBlocked: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = model('Token', tokenSchema);
