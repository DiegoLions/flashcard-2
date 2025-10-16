const baralhoSchema = require("./baralho.schema.js");
const flashcardSchema = require("../flashcard/flashcard.schema.js");

async function listarBaralhos(req, res) {
      try {
    const baralhos = await baralhoSchema.find();
    const flashcards = await flashcardSchema.find();
      if (baralhos.length === 0) {
    return res.status(400).send('Nenhum baralho cadastrado.');
  }

    const listaDeBaralhos = baralhos.map(baralho => {
      const flashcardsDoBaralho = flashcards.filter(
        flashcard => flashcard.idBaralho === baralho.id
      );
      return `
        ID: ${baralho.id}
        Nome: ${baralho.nome}
        Número de Flashcards: ${flashcardsDoBaralho.length}`;
    }).join('\n');

    const mensagemCompleta = `\n=== BARALHOS CADASTRADOS ===\n${listaDeBaralhos}\n`;
    return res.status(200).send(mensagemCompleta);
  } catch (error) {
    console.error("Erro ao buscar os baralhos:", error.message);
    return res.status(500).send("Erro ao buscar os baralhos.");
  }
}

module.exports = listarBaralhos;
