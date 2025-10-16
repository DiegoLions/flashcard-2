const mongoose = require("mongoose");

const flashcardSchema = new mongoose.Schema({
  idBaralho: { type: mongoose.Schema.Types.ObjectId, ref: "Baralho", required: true },
  pergunta: { type: String, required: true },
  resposta: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.models.Flashcard || mongoose.model("Flashcard", flashcardSchema);
