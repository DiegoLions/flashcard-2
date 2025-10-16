const baralhoSchema = require ("./baralho.schema.js")

async function criarBaralho(req, res) {
  const { nome } = req.body;

  try {
    const baralho = new baralhoSchema ({nome: nome})
    await baralho.save();
    return res.status(201).send(`Baralho '${nome}' criado com sucesso!`);
  } catch (error) {
    res.send ("Erro ao criar o baralho:",error.message);
    throw error;
  }
}

module.exports = criarBaralho;