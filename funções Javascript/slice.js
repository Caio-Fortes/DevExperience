//O método slice() extrai uma parte de uma string e a retorna como uma nova string, sem modificar a string original.

const str = 'The quick brown fox jumps over the lazy dog.';

console.log(str.slice(31));
// expected output: "the lazy dog."

console.log(str.slice(4, 19));
// expected output: "quick brown fox"

console.log(str.slice(-4));
// expected output: "dog."

console.log(str.slice(-9, -5));
// expected output: "lazy"

//slice com array
//O método slice() retorna uma cópia de parte de um array a partir de um subarray criado entre as posições início e fim 
//(fim não é incluído) de um array original. O Array original não é modificado.

const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(animals.slice(2));

console.log(animals.slice(2, 4));

console.log(animals.slice(1, 5));

console.log(animals.slice(-2));

console.log(animals.slice(2, -1));

console.log(animals.slice());

