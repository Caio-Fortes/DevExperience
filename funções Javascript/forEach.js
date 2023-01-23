const nomes = ['Whinds', 'Freeway', 'Teste', 'Maria'];

nomes.forEach(function(nome, i) {
    console.log('[forEach]', nome, i);
})

//Sempre que você for fazer um loop for, vale mais a pena usar um forEach, pois ele elimina a carga mental 
//de ter que lidar com as variáveis de controle e por consequência pode ajudar a deixar o código mais fácil de ler, 
//levando em conta que essa é uma forma super usada no mundo JavaScript em geral.
