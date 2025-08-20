const prompt = require('prompt-sync')();

module.exports = function criarBaralho(menu, baralhos) {
  const nome = prompt('Digite o nome do novo baralho: ');
  const id = baralhos.length > 0 ? Math.max(...baralhos.map(b => b.id)) + 1 : 1;

  const novoBaralho = {
    id: id,
    nome: nome,
    flashcards: [] 
  };
  
  baralhos.push(novoBaralho);
  console.log(`Baralho '${nome}' criado com sucesso!`);
  
  menu();
};
//