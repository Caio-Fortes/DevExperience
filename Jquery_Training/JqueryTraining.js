//elemento chamado ao clicar
$(".sumir").click(function(){ 
    $(".sumir").hide(); //sumir elemento
    $(".alterarCor").css("background-color", "red");
});

// Altera padrões de css
$(document).add(function(){

    //pegar um valor dentro da div
    var valorDaDiv = $(".produtosIntTitulo").text();    
    console.log(valorDaDiv)

    var vezes = 100
    var lista = $( "li" ).add("p")
    $(lista).css("background-color", "blue");
})

$("#DataValidadeAutorizacaoRegistro").addClass("col col-xs-12 alert alert-danger");
 //usado para adicionar uma class

    //Marcando os checkboxs
    if ($('#selecionarTodosDaPagina').prop("checked")) {
        $(CheckboxJob).prop("checked", true);
    } else {
        $(CheckboxJob).prop("checked", false);
    }