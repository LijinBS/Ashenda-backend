const mongoose = require('mongoose');

require('dotenv').config({ debug: true });

const connectDB = async () => {
  const ConnectionURI = process.env.DB_CONNECTION_URI;
  mongoose.connect(ConnectionURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // dbName: 'ashenda',
  });
  mongoose.connection.on('error', (e) => {
    console.log(e.message, 'Connection failed');
  });

  mongoose.connection.on('connected', (e) => {
    console.log('connected successfully');
  });
};

module.exports = connectDB;
