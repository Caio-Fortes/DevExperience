//Utilizada para pegar a data e a hora atual. 

//retorna uma string da data e hora. 
var testeData = Date();
console.log('teste data 1:', testeData, "A variável testeData é do tipo: " + typeof(testeData));

//retorna como objeto
var dataAtual = new Date();
console.log('data atual object', dataAtual, "A variável dataAtual é do tipo: " + typeof(dataAtual));

//data correspondente em milissegundos
var novaData = new Date(1594682971156);
console.log('nova data em milisegundos', novaData);

//informar todos os elementos que compõem a data
var dataParametro = new Date(2020,2,01,8,30,0);
console.log('data com parametros personalizados', dataParametro);

var dataParametro2 = new Date(2020,2,01);
console.log('data com parametros personalizados 2',dataParametro2);

var dataAtual = new Date();
var dia = dataAtual.getDate();
var mes = (dataAtual.getMonth() + 1);
var ano = dataAtual.getFullYear();
var horas = dataAtual.getHours();
var minutos = dataAtual.getMinutes();
var segundos = dataAtual.getSeconds();
console.log("Hoje é dia " + dia + "/" + mes + " de " + ano + ". Agora são " + horas + ":" + minutos + "h.");

//obtendo um timestamp de horas já fixadas
var data = "02/01/2015";
var hora = "10:00:00";
var d = new Date(data + " " + hora);
console.log(d.getTime());

//obter timestamp 
var horaAtual = Date.now()
console.log(horaAtual)

//Função de formatação de data personalizada  Ele pode ser ao estilo aa/dd/mm, aaaa-dd-mm.
const today = new Date();
function formatDate(date, format) {
    const map = {
        mm: date.getMonth() + 1,
        dd: date.getDate(),
        aa: date.getFullYear().toString().slice(-2),
        aaaa: date.getFullYear()
    }

    return format.replace(/mm|dd|aa|aaaa/gi, matched => map[matched])
}
var resposta = formatDate(today, 'mm/dd/aa');

//Função de formatação de data personalizada  Ele pode ser ao estilo horas.
function formatarDataHora(date, format){
    const map = {
        hr: date.getHours(),
        min: date.getMinutes(),
        seg: date.getSeconds()
    }
    return format.replace(/hr|min|seg/gi, matched => map[matched])
}
var resposta2 = formatarDataHora(today, 'hr:min:seg')
console.log(resposta2)