const prompt = require('prompt-sync')();

module.exports = function criarFlashcard(menu, baralhos) {
  if (baralhos.length === 0) {
    console.log('Nenhum baralho existe. Crie um baralho primeiro para poder adicionar flashcards.');
    prompt('Pressione Enter para voltar...');
    menu();
    return;
  }

  console.log('\n--- Baralhos Disponíveis ---');
  baralhos.forEach(b => console.log(`ID: ${b.id} | Nome: ${b.nome}`));
  
  const baralhoId = parseInt(prompt('Digite o ID do baralho para o novo flashcard: '));
  const baralho = baralhos.find(b => b.id === baralhoId);

  if (!baralho) {
    console.log('Baralho não encontrado.');
    prompt('Pressione Enter para voltar...');
    menu();
    return;
  }
  
  const pergunta = prompt('Digite a pergunta (frente do flashcard): ');
  const resposta = prompt('Digite a resposta (verso do flashcard): ');

  const id = baralho.flashcards.length > 0 ? Math.max(...baralho.flashcards.map(f => f.id)) + 1 : 1;

  const novoFlashcard = {
    id: id,
    pergunta: pergunta,
    resposta: resposta
  };
  
  baralho.flashcards.push(novoFlashcard);
  console.log('Flashcard adicionado com sucesso!');
  
  prompt('Pressione Enter para voltar ao menu...');
  menu();
};
//