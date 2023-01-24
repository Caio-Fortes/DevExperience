//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

//O Promise objeto representa a eventual conclusão (ou falha) de uma operação assíncrona e seu valor resultante.

function getDados() {
    return new Promise((resolve) => {
        const arrayNumeros = [1]
        for(var i=0; i < arrayNumeros.length; i++){
            arrayNumeros[i] = arrayNumeros + 1
        }
        resolve(arrayNumeros)
    })
}

console.log(getDados())