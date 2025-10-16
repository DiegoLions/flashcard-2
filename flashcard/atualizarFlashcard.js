const baralhoSchema = require("./baralho.schema.js");
const flashcardSchema = require("../flashcard/flashcard.schema.js");

async function atualizarFlashcard(req, res) {
  try {
    const { idFlashcard } = req.params;
    const { idBaralho, novaPergunta, novaResposta } = req.body;

    if (!idBaralho || !idFlashcard) {
      return res.status(400).send("IDs do baralho e do flashcard são obrigatórios.");
    }

    const objectIdRegex = /^[0-9a-zA-Z]{24}$/;
    if (!objectIdRegex.test(idBaralho) || !objectIdRegex.test(idFlashcard)) {
      return res
        .status(400)
        .send("IDs inválidos. Devem ser ObjectId válidos do MongoDB.");
    }

    if (!novaPergunta && !novaResposta) {
      return res
        .status(400)
        .send("Nenhum dado para atualizar foi fornecido (novaPergunta ou novaResposta).");
    }

    const baralho = await baralhoSchema.findById(idBaralho);
    if (!baralho) {
      return res.status(404).send("Baralho não encontrado.");
    }

    const atualizacoes = {};
    if (novaPergunta && novaPergunta.trim() !== "") atualizacoes.pergunta = novaPergunta;
    if (novaResposta && novaResposta.trim() !== "") atualizacoes.resposta = novaResposta;

    const flashcardAtualizado = await flashcardSchema.findOneAndUpdate(
      { _id: idFlashcard, idBaralho: idBaralho },
      { $set: atualizacoes },
      { new: true }
    );

    if (!flashcardAtualizado) {
      return res
        .status(404)
        .send("Flashcard não encontrado neste baralho.");
    }

    return res.status(200).send({
      mensagem: "Flashcard atualizado com sucesso!",
      flashcard: flashcardAtualizado,
    });

  } catch (error) {
    console.error("Erro ao atualizar flashcard:", error);
    return res
      .status(500)
      .send("Erro interno do servidor ao atualizar o flashcard.");
  }
}

module.exports = atualizarFlashcard;