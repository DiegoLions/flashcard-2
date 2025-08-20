const prompt = require('prompt-sync')();

module.exports = function deletarFlashcard(menu, baralhos) {
  if (baralhos.length === 0) {
    console.log('Nenhum baralho cadastrado para deletar flashcards.');
    prompt('Pressione Enter para voltar...');
    menu();
    return;
  }

  console.log('\n--- Baralhos Disponíveis ---');
  baralhos.forEach(b => console.log(`ID: ${b.id} | Nome: ${b.nome}`));

  const baralhoId = parseInt(prompt('Digite o ID do baralho que contém o flashcard: '));
  const baralho = baralhos.find(b => b.id === baralhoId);
  
  if (!baralho) {
    console.log('Baralho não encontrado.');
    prompt('Pressione Enter para voltar...');
    menu();
    return;
  }

  if (baralho.flashcards.length === 0) {
    console.log('Este baralho não contém flashcards para deletar.');
    prompt('Pressione Enter para voltar...');
    menu();
    return;
  }

  console.log(`\nFlashcards no baralho '${baralho.nome}':`);
  baralho.flashcards.forEach(f => console.log(`ID: ${f.id} | Pergunta: ${f.pergunta}`));

  const flashcardId = parseInt(prompt('Digite o ID do flashcard que deseja deletar: '));
  const flashcardIndex = baralho.flashcards.findIndex(f => f.id === flashcardId);
  
  if (flashcardIndex === -1) {
    console.log('Flashcard não encontrado.');
    prompt('Pressione Enter para voltar...');
    menu();
    return;
  }

  const confirmacao = prompt(`Tem certeza que deseja deletar o flashcard '${baralho.flashcards[flashcardIndex].pergunta}'? (s/n) `);
  if (confirmacao.toLowerCase() === 's') {
    baralho.flashcards.splice(flashcardIndex, 1);
    console.log('Flashcard deletado com sucesso!');
  } else {
    console.log('Operação cancelada.');
  }

  prompt('Pressione Enter para voltar ao menu...');
  menu();
};
//