const baralhoSchema = require("./baralho.schema.js");
const flashcardSchema = require("../flashcard/flashcard.schema.js");

async function deletarBaralho(req, res) {
  try {
    const { id } = req.params;

    const totalBaralhos = await baralhoSchema.countDocuments();
    if (totalBaralhos === 0) {
      return res.status(400).send("Nenhum baralho cadastrado para exclusão.");
    }


    if (!id) {
      return res.status(400).send("ID do baralho é obrigatório.");
    }

    if (!id.match(/^[0-9a-zA-Z]{24}$/)) {
      return res.status(400).send("ID inválido. O formato deve ser um ObjectId do MongoDB.");
    }

    const baralhoRemovido = await baralhoSchema.findByIdAndDelete(id);

    if (!baralhoRemovido) {
      return res.status(404).send(`Não foi encontrado um baralho com o ID ${id}.`);
    }

    return res.status(200).send({
      mensagem: "Baralho deletado com sucesso!",
      baralhoDeletado: baralhoRemovido,
    });

  } catch (error) {
    console.error("Erro ao deletar baralho:", error);
    return res.status(500).send("Erro interno do servidor ao deletar baralho.");
  }
}

module.exports = deletarBaralho;
