$(function () {
    flatpickr("#data_inicio", {
        minDate: "today",
        locale: "pt",
        dateFormat: "d/m/Y H:i",
        enableTime: true,
        time_24hr: true
    });

    flatpickr("#data_termino", {
        minDate: "today",
        locale: "pt",
        dateFormat: "d/m/Y H:i",
        enableTime: true,
        time_24hr: true
    });

    $("#data_inicio").change(function() {
        flatpickr("#data_termino", {
            minDate: atualizarDataInicial(),
            locale: "pt",
            dateFormat: "d/m/Y H:i",
            enableTime: true,
            time_24hr: true
        });
    });

    $("#calcular").click(function(event){
        event.preventDefault();
        
        $(".modal").modal({
            showClose: false,
            fadeDuration: 900
        });
        
        setTimeout(function(){
            $(".form-inline").submit();
        }, 2500);        
    });
});

function atualizarDataInicial() {
    var sdata = $("#data_inicio").val();

    if(sdata == "") return "today";
    
    var gate = sdata.split(" ");
    var adata = gate[0].split("/");

    adata = adata.reverse();

    return adata[0] + "-" + adata[1] + "-" + adata[2];
};