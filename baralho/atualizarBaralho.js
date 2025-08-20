const prompt = require('prompt-sync')();

module.exports = function atualizarBaralho(menu, baralhos) {
  if (baralhos.length === 0) {
    console.log('Nenhum baralho cadastrado para atualizar.');
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

    const id = parseInt(prompt('Digite o ID do baralho que deseja atualizar (ou "0" para cancelar): '));
    
    
    if (id === 0) {
        break;
    }

    const baralho = baralhos.find(b => b.id === id);

    if (!baralho) {
      console.log('Baralho não encontrado. Tente novamente.');
      continue; // 
    }
    
    const novoNome = prompt(`Digite o novo nome para o baralho '${baralho.nome}': `);
    baralho.nome = novoNome;
    console.log('Baralho atualizado com sucesso!');

    const continuar = prompt('Deseja atualizar outro baralho? (s/n) ');
    if (continuar.toLowerCase() !== 's') {
      break; // 
    }
  }
  
  prompt('Pressione Enter para voltar ao menu...');
  menu();
};