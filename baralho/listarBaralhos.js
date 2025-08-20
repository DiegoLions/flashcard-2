const prompt = require('prompt-sync')();

module.exports = function listarBaralhos(menu, baralhos) {
  if (baralhos.length === 0) {
    console.log("Nenhum baralho cadastrado.");
  } else {
    console.log('\n=== BARALHOS CADASTRADOS ===');
    baralhos.forEach(baralho => {
      console.log(`ID: ${baralho.id} | Nome: ${baralho.nome} | Flashcards: ${baralho.flashcards.length}`);
    });
  }
  
  prompt('Pressione Enter para voltar ao menu...');
  menu();
};
//