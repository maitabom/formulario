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
            time_24hr: true,
            onClose: function () {
                var tempo = calcularTempoDataHora($("#data_inicio").val(), $("#data_termino").val());

                if (tempo != null && tempo > 24) {
                    $("#disponibilidade").modal({
                        showClose: false,
                        fadeDuration: 300
                    });
                }
            }
        });
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

    $("#disponivel").click(function () {
        $.modal.close();
        $("#disponibilidade").val("1");
    });

    $("#indisponivel").click(function () {
        $.modal.close();
        $("#disponibilidade").val("0");
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

function calcularTempoDataHora(sDataInicio, sDataTermino) {
    var pivot_data_inicio = sDataInicio.split(" ");
    var pivot_data_termino = sDataTermino.split(" ");

    if (pivot_data_inicio.length == 2 && pivot_data_termino.length == 2) {
        var data_inicio = pivot_data_inicio[0];
        var data_termino = pivot_data_termino[0];
        var hora_inicio = pivot_data_inicio[1];
        var hora_termino = pivot_data_termino[1];

        data_inicio = data_inicio.split("/");
        data_termino = data_termino.split("/");
        hora_inicio = hora_inicio.split(":");
        hora_termino = hora_termino.split(":");

        var dataInicio = new Date(data_inicio[2], data_inicio[1], data_inicio[0], hora_inicio[0], hora_inicio[1]);
        var dataTermino = new Date(data_termino[2], data_termino[1], data_termino[0], hora_termino[0], hora_termino[1]);
        var dms = (dataTermino - dataInicio);
        var dhr = (dms / 3600000);

        return dhr;
    } else {
        return null;
    }
}