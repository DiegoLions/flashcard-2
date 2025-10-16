const baralhoSchema = require("./baralho.schema.js");
const flashcardSchema = require("../flashcard/flashcard.schema.js");

async function atualizarBaralho(req, res) {
  try {
    const { id } = req.params;
    const { nome } = req.body;

    const totalBaralhos = await baralhoSchema.countDocuments();
    if (totalBaralhos === 0) {
      return res.status(400).send("Nenhum baralho cadastrado para atualizar.");
    }

    if (!id) {
      return res.status(400).send("ID do baralho é obrigatório.");
    }

    if (!nome || nome.trim() === "") {
      return res.status(400).send("O campo 'nome' é obrigatório.");
    }

    if (!id.match(/^[0-9a-zA-Z]{24}$/)) {
      return res.status(400).send("ID inválido. O formato deve ser um ObjectId do MongoDB.");
    }

    const baralhoAtualizado = await baralhoSchema.findByIdAndUpdate(
      id,
      { nome: nome },
      { new: true, runValidators: true }
    );

    if (!baralhoAtualizado) {
      return res.status(404).send(`Não foi encontrado um baralho com o ID ${id}.`);
    }
 
    return res.status(200).send({
      mensagem: "Baralho atualizado com sucesso!",
      baralho: baralhoAtualizado,
    });

  } catch (error) {
    console.error("Erro ao atualizar baralho:", error);
    return res.status(500).send("Erro interno do servidor ao atualizar baralho.");
  }
}

module.exports = atualizarBaralho;

