const baralhoSchema = require("./baralho.schema.js");
const flashcardSchema = require("../flashcard/flashcard.schema.js");

async function criarFlashcard(req, res) {
  try {
    const { idBaralho } = req.params;
    const { pergunta, resposta } = req.body;

    const totalBaralhos = await baralhoSchema.countDocuments();
    if (totalBaralhos === 0) {
      return res
        .status(400)
        .send("Nenhum baralho existe. Crie um baralho primeiro para poder adicionar flashcards.");
    }

    if (!pergunta || !resposta) {
      return res.status(400).send("Pergunta e resposta do flashcard são obrigatórias.");
    }

    if (!idBaralho || !idBaralho.match(/^[0-9a-zA-Z]{24}$/)) {
      return res
        .status(400)
        .send("ID do baralho inválido. Deve ser um ObjectId do MongoDB.");
    }

    const baralho = await baralhoSchema.findById(idBaralho);
    if (!baralho) {
      return res.status(404).send("Baralho não encontrado.");
    }

    const novoFlashcard = new flashcardSchema({
      idBaralho,
      pergunta,
      resposta,
    });

    await novoFlashcard.save();

    if (baralho.flashcards) {
      baralho.flashcards.push(novoFlashcard._id);
      await baralho.save();
    }

    return res.status(201).send({
      mensagem: "Flashcard adicionado com sucesso!",
      flashcard: novoFlashcard,
    });
  } catch (error) {
    console.error("Erro ao criar flashcard:", error);
    return res.status(500).send("Erro interno do servidor ao criar flashcard.");
  }
}

module.exports = criarFlashcard;
