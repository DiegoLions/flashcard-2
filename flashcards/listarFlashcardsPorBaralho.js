const prompt = require('prompt-sync')();

module.exports = function listarFlashcardsPorBaralho(menu, baralhos) {
  if (baralhos.length === 0) {
    console.log('Nenhum baralho cadastrado. Nada para listar.');
    prompt('Pressione Enter para voltar...');
    menu();
    return;
  }

  console.log('\n--- Baralhos Disponíveis ---');
  baralhos.forEach(b => console.log(`ID: ${b.id} | Nome: ${b.nome}`));

  const baralhoId = parseInt(prompt('Digite o ID do baralho para listar os flashcards: '));
  const baralho = baralhos.find(b => b.id === baralhoId);

  if (!baralho) {
    console.log('Baralho não encontrado.');
  } else if (baralho.flashcards.length === 0) {
    console.log('Este baralho não contém flashcards.');
  } else {
    console.log(`\n=== FLASHCARDS EM '${baralho.nome}' ===`);
    baralho.flashcards.forEach(flashcard => {
      console.log(`ID: ${flashcard.id} | Pergunta: ${flashcard.pergunta}`);
      console.log(`Resposta: ${flashcard.resposta}`);
      console.log('---');
    });
  }

  prompt('Pressione Enter para voltar ao menu...');
  menu();
};
//