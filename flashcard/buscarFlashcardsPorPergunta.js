const baralhoSchema = require("./baralho.schema.js");
const flashcardSchema = require("../flashcard/flashcard.schema.js");

async function buscarFlashcardsPorPergunta(req, res) {
  try {
    const { termo } = req.params;

    if (!termo || termo.trim() === "") {
      return res.status(400).send("Por favor, forneça um termo de busca.");
    }

    const totalFlashcards = await flashcardSchema.countDocuments();
    if (totalFlashcards === 0) {
      return res.status(404).send("Nenhum flashcard cadastrado.");
    }

    const resultados = await flashcardSchema
      .find({
        pergunta: { $regex: termo, $options: "i" },
      })
      .populate("idBaralho", "nome");

    if (resultados.length === 0) {
      return res
        .status(404)
        .send(`Nenhum flashcard encontrado com o termo '${termo}' na pergunta.`);
    }

    const listaResultados = resultados
      .map(
        (f) =>
          `Baralho: ${f.idBaralho?.nome || "Desconhecido"}\n` +
          `ID: ${f._id} | Pergunta: ${f.pergunta}\n` +
          `Resposta: ${f.resposta}\n`
      )
      .join("\n");

    const mensagemFinal = `\n=== RESULTADOS DA BUSCA (${resultados.length} encontrados) ===\n${listaResultados}`;

    return res.status(200).send(mensagemFinal);

  } catch (error) {
    console.error("Erro ao buscar flashcards por pergunta:", error);
    return res
      .status(500)
      .send("Erro interno do servidor ao buscar flashcards por pergunta.");
  }
}

module.exports = buscarFlashcardsPorPergunta;