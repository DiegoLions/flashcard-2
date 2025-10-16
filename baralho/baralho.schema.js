const mongoose = require('mongoose');

const baralhoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required:true
  }
});

const Baralho = mongoose.model('baralho', baralhoSchema);

module.exports = Baralho;