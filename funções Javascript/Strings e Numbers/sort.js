/*O método sort() ordena os elementos do próprio array e retorna o array. 
A ordenação não é necessariamente estável. A ordenação padrão é de acordo com a 
pontuação de código unicode.*/ 

// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

var frutas = ['maça', 'abacate', 'caqui', 'uva']
frutas.sort()

console.log(frutas)

// Objetos podem ser ordenados de acordo com o valor de uma de suas propriedades.

var pessoas = [
    { nome: 'Caio', idade: 21 },
    { nome: 'José', idade: 37 },
    { nome: 'jailson', idade: 45 },
    { nome: 'Roberto', idade: -12 },
    { nome: 'obervandro' },
    { nome: 'Araujoi', idade: 37 }
  ];
  
  console.log('original', pessoas)

  pessoas.sort(function(a, b){
    if(a.nome > b.nome){
        return 1;
    }
    if(a.nome < b.nome){
        return -1
    }
    return 1
  })

  console.log('ordenado', pessoas)


//usando condição ternaria
console.log('condição ternária')
  var pessoas2 = [
    { nome: 'Caio', idade: 21 },
    { nome: 'José', idade: 37 },
    { nome: 'jailson', idade: 45 },
    { nome: 'Roberto', idade: -12 },
    { nome: 'obervandro' },
    { nome: 'Araujoi', idade: 37 }
  ];

  console.log('original', pessoas2)

  pessoas2.sort(function(a, b){
    return a.nome == b.nome ? 0 : (a.nome < b.nome ? -1 : 1)
})

console.log('ordenado com condição ternária', pessoas2)