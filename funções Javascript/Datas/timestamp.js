/*Timestamp: o timestamp representa um único instante, um ponto específico na linha do tempo 
(a quantidade de tempo decorrida desde o “instante zero”, também conhecido como Unix Epoch - 
que corresponde a 1 de janeiro de 1970, à meia-noite, em UTC) ele pode corresponder a uma 
data e hora diferente em cada parte do mundo (ou seja, depende do fuso horário) o timestamp 
é tradicionalmente representado em segundos ou milissegundos.*/

//obter timestamp 
const horaAtual = Date.now()
console.log('timestamp de agora:', horaAtual)

// converte timestamp personalizado para data
const date = new Date(1807110465000);
console.log('timesTamp personalizado:', date.toLocaleDateString("pt-BR"))

//converte timestamp atual para data atual.
const timestampAtual = Date.now()
const dataAtual = new Date(timestampAtual);
console.log('hoje é dia:', dataAtual.toLocaleDateString("pt-BR"))

//caso venham como string
const string = "/Date(1670295600000)/";
const num  = parseInt(string.match(/\d/g).join('')); // typeof vira numer e remove as pontuações

//obtendo um timestamp de horas já fixadas
const data = "02/01/2015";
const hora = "10:00:00";
const d = new Date(data + " " + hora);
console.log(d.getTime());
