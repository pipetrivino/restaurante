const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: String
});

module.exports = mongoose.model('producto', productoSchema);
