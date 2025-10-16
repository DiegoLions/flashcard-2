const baralhoSchema = require("./baralho.schema.js");
const flashcardSchema = require("../flashcard/flashcard.schema.js");

async function listarFlashcards(req, res) {
  try {
    const baralhos = await baralhoSchema.find();
    const flashcards = await flashcardSchema.find();

    if (baralhos.length === 0) {
      return res.status(400).send("Nenhum baralho cadastrado. Nada para listar.");
    }

    if (flashcards.length === 0) {
      return res.status(404).send("Nenhum flashcard cadastrado em nenhum baralho.");
    }

    const baralhosComFlashcards = baralhos.map((baralho) => {
      const flashcardsDoBaralho = flashcards.filter(
        (flashcard) => flashcard.idBaralho.toString() === baralho._id.toString()
      );

      if (flashcardsDoBaralho.length === 0) {
        return `\n--- Baralho: '${baralho.nome}' (ID: ${baralho._id}) ---\n  Nenhum flashcard neste baralho.\n`;
      }

      const listaFlashcards = flashcardsDoBaralho
        .map(
          (f) => `\n ID do Flashcard: ${f._id}
          Pergunta: ${f.pergunta} 
          Resposta: ${f.resposta}`
        )
        .join("\n");

      return `\n--- Baralho: '${baralho.nome}' 
      ID do Baralho: ${baralho._id} ---\n${listaFlashcards}\n`;
    }).join("\n");

    const mensagemCompleta = `=== TODOS OS FLASHCARDS CADASTRADOS ===\n${baralhosComFlashcards}`;
    return res.status(200).send(mensagemCompleta);

  } catch (error) {
    console.error("Erro ao listar flashcards:", error);
    return res.status(500).send("Erro interno do servidor ao listar flashcards.");
  }
}

module.exports = listarFlashcards;
