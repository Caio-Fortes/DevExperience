//elemento chamado ao clicar
$(".sumir").click(function(){ 
    $(".sumir").hide(); //sumir elemento
    $(".alterarCor").css("background-color", "red");
});

// Altera padrões de css
$(document).add(function(){
    var vezes = 100
    var lista = $( "li" ).add("p")
    $(lista).css("background-color", "blue");
})

$("#DataValidadeAutorizacaoRegistro").addClass("col col-xs-12 alert alert-danger");
 //usado para adicionar uma class