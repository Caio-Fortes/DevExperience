//indexOf() O método indexOf() retorna o primeiro índice 
//em que o elemento pode ser encontrado no array, retorna -1 caso o mesmo não esteja presente.

const names = ["Matheus", "João", "Pedro",]
const index = names. indexOf("Pedro");

if (index !== -1) {
    names[index] = "Josias";
    console.log(names) // ["Matheus", "João", "Josias"]
}

//utilizando numeros 
const names2 = ["1", "2", "3", "4565435345345", "433", "87"]
const index2 = names2. indexOf("4565435345345");
if (index2 !== -1) {
    names2[index2] = "10";
    console.log(names2) 
}

const frase = "O rato roeu a roupa do rei de Roma";
console.log(frase.indexOf("rei")); // 23
console.log(frase.indexOf("teste")); // -1