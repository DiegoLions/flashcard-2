const baralhoSchema = require("./baralho.schema.js");
const flashcardSchema = require("../flashcard/flashcard.schema.js");

async function deletarFlashcard(req, res) {
  try {
    const { idFlashcard } = req.params;
    const { idBaralho } = req.body;

    if (!idBaralho || !idFlashcard) {
      return res.status(400).send("IDs do baralho e do flashcard são obrigatórios.");
    }

    const objectIdRegex = /^[0-9a-zA-Z]{24}$/;
    if (!objectIdRegex.test(idBaralho) || !objectIdRegex.test(idFlashcard)) {
      return res
        .status(400)
        .send("IDs inválidos. Devem ser ObjectId válidos do MongoDB.");
    }

    const baralho = await baralhoSchema.findById(idBaralho);
    if (!baralho) {
      return res.status(404).send("Baralho não encontrado.");
    }

    const flashcardDeletado = await flashcardSchema.findOneAndDelete({
      _id: idFlashcard,
      idBaralho: idBaralho,
    });

    if (!flashcardDeletado) {
      return res.status(404).send("Flashcard não encontrado neste baralho.");
    }

    if (baralho.flashcards && baralho.flashcards.includes(flashcardDeletado._id)) {
      baralho.flashcards = baralho.flashcards.filter(
        (fId) => fId.toString() !== idFlashcard
      );
      await baralho.save();
    }

    return res.status(200).send({
      mensagem: "Flashcard deletado com sucesso!",
      flashcard: flashcardDeletado,
    });

  } catch (error) {
    console.error("Erro ao deletar flashcard:", error);
    return res
      .status(500)
      .send("Erro interno do servidor ao deletar o flashcard.");
  }
}

module.exports = deletarFlashcard;
