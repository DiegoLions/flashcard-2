const prompt = require('prompt-sync')();

module.exports = function atualizarFlashcard(menu, baralhos) {
  if (baralhos.length === 0) {
    console.log('Nenhum baralho cadastrado para atualizar flashcards.');
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
    console.log('Este baralho não contém flashcards para atualizar.');
    prompt('Pressione Enter para voltar...');
    menu();
    return;
  }

  console.log(`\nFlashcards no baralho '${baralho.nome}':`);
  baralho.flashcards.forEach(f => console.log(`ID: ${f.id} | Pergunta: ${f.pergunta}`));

  const flashcardId = parseInt(prompt('Digite o ID do flashcard que deseja atualizar: '));
  const flashcard = baralho.flashcards.find(f => f.id === flashcardId);
  
  if (!flashcard) {
    console.log('Flashcard não encontrado.');
    prompt('Pressione Enter para voltar...');
    menu();
    return;
  }
  
  const novaPergunta = prompt(`Nova pergunta (deixe em branco para manter a atual '${flashcard.pergunta}'): `);
  const novaResposta = prompt(`Nova resposta (deixe em branco para manter a atual '${flashcard.resposta}'): `);

  if (novaPergunta.trim() !== '') {
    flashcard.pergunta = novaPergunta;
  }
  if (novaResposta.trim() !== '') {
    flashcard.resposta = novaResposta;
  }
  
  console.log('Flashcard atualizado com sucesso!');
  
  prompt('Pressione Enter para voltar ao menu...');
  menu();
};
//