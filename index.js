const express = require('express');
const mongoose = require ('mongoose');
const dotenv = require ('dotenv');
const { baralhos, flashcards } = require('./data');

dotenv.config();

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD

mongoose.connect(
    `mongodb+srv://${dbUser}:${dbPassword}@diegoprojects.vfeiueq.mongodb.net/Baralhos?retryWrites=true&w=majority&appName=DiegoProjects`
);
mongoose.connection.once("open",() => {
    console.log("Conectado ao MongoDB");
});
mongoose.connection?.on('error', (err) => {
    console.error('Error to connect - MongoDB: Error: ${err.message}');
});

const app = express();
const port = 3000;
app.use(express.json());

const criarBaralho = require('./baralho/criarBaralho');
const listarBaralhos = require('./baralho/listarBaralhos');
const atualizarBaralho = require('./baralho/atualizarBaralho');
const deletarBaralho = require('./baralho/deletarBaralho');

const criarFlashcard = require('./flashcard/criarFlashcard');
const listarFlashcards = require('./flashcard/listarFlashcards');
const listarFlashcardsPorBaralho = require('./flashcard/listarFlashcardsPorBaralho');
const buscarFlashcardsPorPergunta = require('./flashcard/buscarFlashcardsPorPergunta');
const atualizarFlashcard = require('./flashcard/atualizarFlashcard');
const deletarFlascard = require('./flashcard/deletarFlashcard');


app.post ('/baralho', async (req, res) => await criarBaralho (req, res, baralhos, flashcards))

app.get ('/baralho', async (req, res) => await listarBaralhos(req, res, baralhos, flashcards))

app.put ('/baralho/:id', async (req, res) => await atualizarBaralho(req, res, baralhos, flashcards))

app.delete ('/baralho/:id', async (req, res) => await deletarBaralho(req, res, baralhos, flashcards))


app.post ('/flashcard/:idBaralho', async (req, res) => await criarFlashcard(req, res, baralhos, flashcards))

app.get ('/flashcard', async (req, res) => await listarFlashcards(req, res, baralhos, flashcards))

app.get ('/flashcard/pergunta/:termo', async (req, res) => await buscarFlashcardsPorPergunta(req, res, baralhos, flashcards))

app.get ('/flashcard/baralho/:idBaralho', async (req, res) => await listarFlashcardsPorBaralho(req, res, baralhos, flashcards))

app.put ('/flashcard/:idFlashcard', async (req, res) => await atualizarFlashcard(req, res, baralhos, flashcards))

app.delete ('/flashcard/:idFlashcard', async (req, res) => await deletarFlascard(req, res, baralhos, flashcards))



app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/users', (req, res) => {
  res.send('Hello users!');
});

app.post('/soma', (req, res) => {
  const { numero1, numero2 } = req.body;
  const soma = parseInt(numero1) + parseInt(numero2);
  res.send(`O resultado da sua soma é ${soma}`);
});



app.listen(port, () => {
console.log(`Servidor ouve na porta ${port}`);
});