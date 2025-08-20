const prompt = require('prompt-sync')();

module.exports = function deletarBaralho(menu, baralhos) {
  if (baralhos.length === 0) {
    console.log('Nenhum baralho cadastrado para deletar.');
    prompt('Pressione Enter para voltar ao menu...');
    menu();
    return;
  }
  
  //
  while (true) {
    console.log('\n=== BARALHOS CADASTRADOS ===');
    baralhos.forEach(baralho => {
      console.log(`ID: ${baralho.id} | Nome: ${baralho.nome} | Flashcards: ${baralho.flashcards.length}`);
    });

    const id = parseInt(prompt('Digite o ID do baralho que deseja deletar (ou "0" para cancelar): '));

    
    if (id === 0) {
        break;
    }

    const index = baralhos.findIndex(b => b.id === id);

    if (index === -1) {
      console.log('Baralho não encontrado. Tente novamente.');
      continue; 
    }

    const confirmacao = prompt(`Tem certeza que deseja deletar o baralho '${baralhos[index].nome}' e todos os seus flashcards? (s/n) `);
    if (confirmacao.toLowerCase() === 's') {
      baralhos.splice(index, 1);
      console.log('Baralho e flashcards associados deletados com sucesso!');
    } else {
      console.log('Operação cancelada.');
    }

    if (baralhos.length === 0) {
      console.log('Todos os baralhos foram excluídos.');
      break;
    }

    const continuar = prompt('Deseja excluir outro baralho? (s/n) ');
    if (continuar.toLowerCase() !== 's') {
      break;
    }
  }
  
  prompt('Pressione Enter para voltar ao menu...');
  menu();
};