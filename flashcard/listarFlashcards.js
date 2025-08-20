const prompt = require('prompt-sync')();

module.exports = function listarFlashcards(menu, baralhos) {
    if (baralhos.length === 0) {
        console.log('Nenhum baralho cadastrado. Nada para listar.');
        prompt('Pressione Enter para voltar...');
        menu();
        return;
    }

    let totalFlashcards = 0;
    console.log('\n=== TODOS OS FLASHCARDS CADASTRADOS ===');

    baralhos.forEach(baralho => {
        if (baralho.flashcards.length > 0) {
            console.log(`\n--- Baralho: '${baralho.nome}' (ID: ${baralho.id}) ---`);
            baralho.flashcards.forEach(flashcard => {
                console.log(`  - ID: ${flashcard.id} | Pergunta: ${flashcard.pergunta}`);
                console.log(`    Resposta: ${flashcard.resposta}`);
            });
            totalFlashcards += baralho.flashcards.length;
        }
    });

    if (totalFlashcards === 0) {
        console.log('Nenhum flashcard cadastrado em nenhum baralho.');
    }

    prompt('Pressione Enter para voltar ao menu...');
    menu();
};
//