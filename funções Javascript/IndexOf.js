//indexOf() O método indexOf() retorna o primeiro índice 
//em que o elemento pode ser encontrado no array, retorna -1 caso o mesmo não esteja presente.

const names = ["Matheus", "João", "Pedro",]
const index = names. indexOf("Pedro");

if (index !== -1) {
    names[index] = "Josias";
    console.log(names) // ["Matheus", "Josias", "Pedro"]
}

//utilizando numeros 
const names2 = ["1", "2", "3", "4565435345345", "433", "87"]
const index2 = names2. indexOf("4565435345345");
if (index2 !== -1) {
    names2[index2] = "10";
    console.log(names2) 
}