const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODN_URI || 'mongodb://localhost/myresume');
mongoose.set('debug', true);

module.exports = mongoose.connection;