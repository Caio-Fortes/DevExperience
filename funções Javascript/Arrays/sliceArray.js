/*O método slice() quando é utilizado com arrays ele extrai uma parte do array selecionado
e retorna um subArray criado do array original. O Array original não é modificado.*/

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(animals.slice(2));

console.log(animals.slice(2, 4));

console.log(animals.slice(1, 5));

console.log(animals.slice(-2));

console.log(animals.slice(2, -1));

//o array animals n é modificado.
console.log(animals.slice());
