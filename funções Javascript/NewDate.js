
// converte timestamp para data
var date = new Date(1807110465000);
console.log(date.toLocaleDateString("pt-BR"))

var date2 = new Date(1670295600000)
console.log(date2.toLocaleDateString("pt-BR"))

//caso venham como string
var string = "/Date(1670295600000)/";
var num  = parseInt(string.match(/\d/g).join('')); // typeof vira numer e remove as pontuações

dataTeste = new Date(num)
console.log(dataTeste.toLocaleDateString("pt-BR"))
