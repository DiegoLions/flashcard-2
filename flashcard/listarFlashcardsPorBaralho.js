const baralhoSchema = require("./baralho.schema.js");
const flashcardSchema = require("../flashcard/flashcard.schema.js");

async function listarFlashcardsPorBaralho(req, res) {
  try {
    const { idBaralho } = req.params;

    const totalBaralhos = await baralhoSchema.countDocuments();
    if (totalBaralhos === 0) {
      return res.status(400).send("Nenhum baralho cadastrado. Nada para listar.");
    }

    if (!idBaralho || !idBaralho.match(/^[0-9a-zA-Z]{24}$/)) {
      return res.status(400).send("ID do baralho inválido. Deve ser um ObjectId do MongoDB.");
    }

    const baralho = await baralhoSchema.findById(idBaralho);
    if (!baralho) {
      return res.status(404).send("Baralho não encontrado.");
    }

    const flashcards = await flashcardSchema.find({ idBaralho });

    if (flashcards.length === 0) {
      return res.status(404).send("Este baralho não contém flashcards.");
    }

    const listaDeFlashcards = flashcards
      .map(
        (f) => `
ID: ${f._id}
Pergunta: ${f.pergunta}
Resposta: ${f.resposta}
---
`
      )
      .join("");

    const mensagemCompleta = `\n=== FLASHCARDS EM '${baralho.nome}' ===\n${listaDeFlashcards}`;

    return res.status(200).send(mensagemCompleta);
  } catch (error) {
    console.error("Erro ao listar flashcards por baralho:", error);
    return res
      .status(500)
      .send("Erro interno do servidor ao listar flashcards por baralho.");
  }
}

module.exports = listarFlashcardsPorBaralho;