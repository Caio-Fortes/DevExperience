/*usada para manipular strings, substituir dados de uma string, remover e transformar
em uma nova string*/

//substituindo
var texto = "Olá eu sou o Caio fortes, gosto de ser Caio fortes, Caio fortes é o melhor nome!";
var novoTexto = texto.replace(/'Caio', 'fortes'/gi, "Eduardo");
console.log(novoTexto);

//tirando todos valores não numéricos
const x = "A1cd#2AR3"
const somenteNumeros = x.replace(/\D/g,'');
console.log(somenteNumeros); // 123

//mudando a ordenação
var expressao = /(\w+)\s(\w+)\s(\w+)/;
 //o ponto de separação entre elas é o caractere de espaço representado pelo \s.
var nomes = 'Pedro Paulo Maria';
var novosNomes = nomes.replace(expressao, '$2, $1 e $3 ');
console.log(novosNomes); 

//mudando a ordenação e controlando a quantidade de dados valores em cada casa decimal.
var strRG = "999999999";
var stringRGResultado = strRG.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/,"$1.$2.$3-$4");
console.log("O RG informado é: " + stringRGResultado);

//adicionando com ponto de indicação
var adicionarStringAntes = 'Vamos estudar Script';
var stringAntes = adicionarStringAntes.replace('Script','Java$&');
console.log(stringAntes);

//para aprender mais: https://blog.betrybe.com/javascript/javascript-replace/

