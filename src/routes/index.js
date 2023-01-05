const { Router } = require('express');

const rootRoute = Router();
const subRoute = Router();

const authRouter = require('./auth/auth-route');
const userRouter = require('./user/user-route');

const authApiRoute = subRoute.use('/auth', authRouter);
const userApiRoute = subRoute.use('/user', userRouter);

rootRoute.use([authApiRoute, userApiRoute]);

module.exports = rootRoute;
