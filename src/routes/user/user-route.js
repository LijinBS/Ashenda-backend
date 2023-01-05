const { Router } = require('express');

const userRouter = Router();

const {
  getProfile,
  updateProfile,
  changePassword,
} = require('../../controllers/user/user-controller');

userRouter.get('/profile/:userId', getProfile);

userRouter.put('/profile/:userId', updateProfile);

userRouter.put('/change-password/:userId', changePassword);

module.exports = userRouter;
