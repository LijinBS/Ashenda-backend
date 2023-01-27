const { Router } = require('express');

const authRouter = Router();

const {
  register,
  login,
  logout,
  refresh,
} = require('../../controllers/auth/auth-controller');

authRouter.post('/register', register);

authRouter.post('/login', login);

authRouter.post('/logout', logout);

authRouter.post('/refresh', refresh);

module.exports = authRouter;
