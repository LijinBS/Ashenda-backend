/* eslint-disable no-console */

const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const httpServer = require('http');

const { rootErrorHandler } = require('./middlewares/root-error-middleware');

const connectDB = require('./config/db-connection');

const rootRoute = require('./routes/index');

const logger = require('./helpers/logger-helper');

connectDB();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(helmet());
app.disable('x-powered-by');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compression());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

app.use((req, res, next) => {
  logger.info(`${req.method} :: ${req.originalUrl}`);
  next();
});

app.use('/api', rootRoute);

app.use(rootErrorHandler);
// Standalone server

const server = httpServer.createServer(app);

server.listen(PORT, () => {
  logger.info(`application running => ${PORT}`);
});
