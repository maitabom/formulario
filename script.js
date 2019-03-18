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

    $("#data_inicio").change(function () {
        flatpickr("#data_termino", {
            minDate: atualizarDataInicial(),
            locale: "pt",
            dateFormat: "d/m/Y H:i",
            enableTime: true,
            time_24hr: true
        });
    });

    $("#data_termino").change(function () {

    });

    $("#tipo_locacao").change(function () {
        if ($(this).val() == "") {
            $("#final").hide();
            $("#destino").hide();
        } else {
            $("#destino").show();
            var questionaveis = [1, 2, 5, 11, 12, 14, 15, 16];
            var tipo = eval($(this).val());

            if (questionaveis.includes(tipo)) {
                $("#questao").modal({
                    showClose: false,
                    fadeDuration: 300
                });
            } else {
                $("#final").show();
            }
        }
    });

    $("#calcular").click(function (event) {
        event.preventDefault();

        $("#enviando").modal({
            showClose: false,
            fadeDuration: 900
        });

        setTimeout(function () {
            $(".form-inline").submit();
        }, 2500);
    });

    $("#sim").click(function () {
        $.modal.close();
        $("#final").show();
    });

    $("#nao").click(function () {
        $.modal.close();
        $("#final").hide();
    });
});

function atualizarDataInicial() {
    var sdata = $("#data_inicio").val();

    if (sdata == "") return "today";

    var gate = sdata.split(" ");
    var adata = gate[0].split("/");

    adata = adata.reverse();

    return adata[0] + "-" + adata[1] + "-" + adata[2];
};