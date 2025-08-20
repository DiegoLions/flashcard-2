const prompt = require('prompt-sync')();

module.exports = function buscarFlashcardsPorPergunta(menu, baralhos) {

  const todosFlashcards = baralhos.flatMap(baralho => baralho.flashcards);

  if (todosFlashcards.length === 0) {
    console.log('Nenhum flashcard cadastrado.');
    prompt('Pressione Enter para voltar...');
    menu();
    return;
  }

  const termo = prompt('Digite o termo de busca (pergunta ou resposta): ').toLowerCase();

  const resultados = todosFlashcards.filter(f => f.pergunta.toLowerCase().includes(termo) || f.resposta.toLowerCase().includes(termo));

  if (resultados.length === 0) {
    console.log(`Nenhum flashcard encontrado com o termo '${termo}'.`);
  } else {
    console.log(`\n=== RESULTADOS DA BUSCA (${resultados.length} encontrados) ===`);
    resultados.forEach(f => {
      console.log(`ID: ${f.id} | Pergunta: ${f.pergunta} | Resposta: ${f.resposta}`);
    });
  }
  
  prompt('Pressione Enter para voltar ao menu...');
  menu();
};
//