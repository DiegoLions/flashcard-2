const prompt = require('prompt-sync')();
const { baralhos, flashcards } = require('./data.js');

const criarBaralho = require('./baralho/criarBaralho.js');
const listarBaralhos = require('./baralho/listarBaralhos.js');
const atualizarBaralho = require('./baralho/atualizarBaralho.js');
const deletarBaralho = require('./baralho/deletarBaralho.js');

const criarFlashcard = require('./flashcard/criarFlashcard.js');
const listarFlashcards = require('./flashcard/listarFlashcards.js');
const atualizarFlashcard = require('./flashcard/atualizarFlashcard.js');
const deletarFlashcard = require('./flashcard/deletarFlashcard.js');
const listarFlashcardsPorBaralho = require('./flashcard/listarFlashcardsPorBaralho.js');
const buscarFlashcardsPorPergunta = require('./flashcard/buscarFlashcardsPorPergunta.js');

function menu() {
  console.log(`
  === FLASHCARDS SYSTEM ===
  
  --- Baralhos ---
  1. Criar Baralho
  2. Listar Baralhos
  3. Atualizar Baralho
  4. Deletar Baralho
  
  --- Flashcards ---
  5. Criar Flashcard
  6. Listar Todos os Flashcards
  7. Listar Flashcards por Baralho
  8. Atualizar Flashcard
  9. Deletar Flashcard
  10. Buscar Flashcards por Pergunta
  
  11. Sair do Sistema de Flashcards
  `);
  const opcao = prompt('Escolha uma opção: ');

  switch (opcao) {
    case '1':
      criarBaralho(menu, baralhos);
      break;
    case '2':
      listarBaralhos(menu, baralhos);
      break;
    case '3':
      atualizarBaralho(menu, baralhos);
      break;
    case '4':
      deletarBaralho(menu, baralhos);
      break;
    case '5':
      criarFlashcard(menu, baralhos);
      break;
    case '6':
      listarFlashcards(menu, baralhos);
      break;
    case '7':
      listarFlashcardsPorBaralho(menu, baralhos);
      break;
    case '8':
      atualizarFlashcard(menu, baralhos);
      break;
    case '9':
      deletarFlashcard(menu, baralhos);
      break;
    case '10':
      buscarFlashcardsPorPergunta(menu, baralhos);
      break;
    case '11':
      console.log('Saindo do sistema. Obrigado por utilizá-lo! Até mais!');
      return;
    default:
      console.log('Opção inválida!');
      menu();
      break;
  }
}

menu();
//