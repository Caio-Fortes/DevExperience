
var num = "10";
var convertido = parseInt(num);
console.log(convertido); // 10
console.log(typeof convertido); 

var string = "/Date(1670295600000)/";
var num  = parseInt(string.match(/\d/g).join('')); // typeof vira numer
var num2 = string.match(/\d/g).join(''); //o seu typeof continua string 
var num3 = parseInt(string.split(/\D+/).join("")); // typeof vira numer

// console.log(typeof num)
// console.log(typeof num2)
// console.log(typeof num3)

console.log(3,5 + 3,5)