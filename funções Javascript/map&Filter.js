array = [
    {nome: ['caio', 'davi']},
    {idade: ['1', '2']}
]

console.log('array original', array)

//map: cria um novo array com o resultado pesquisado
var arrayMap = array.map(a => a.idade)
console.log('array usando map:', arrayMap)

//filter: cria um novo array pelo resultado dentro da função criada.
const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter(word => word == 'spray');

console.log('array usando filter', result);

//obs: os dois não irão alterar o array original