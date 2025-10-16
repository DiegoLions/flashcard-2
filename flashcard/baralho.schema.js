const mongoose = require("mongoose");

const baralhoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  flashcards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Flashcard" }],
}, { timestamps: true });

module.exports = mongoose.models.Baralho || mongoose.model("Baralho", baralhoSchema);