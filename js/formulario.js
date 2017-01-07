$(document).ready(function () {

    $('.ui.dropdown')
        .dropdown()
    ;

    $('.ui.checkbox')
        .checkbox()
    ;
   console.log("asd");




    $('input[name="pessoa[data-nascimento]"]').on('click',function () {
        $(this).mask("99/99/9999",{placeholder:"dd/mm/aaaa"});

    });

    $('input[name="pessoa[telefone]"]').on('click',function () {
        $(this).mask("(99) 99999-9999");

    });

    $('input[name="pessoa[cep]"]').on('click',function () {
        $(this).mask("99999-999");

    });


    $('.pesquisa-cep').on('click',function (e) {
        var valor = $('input[name="pessoa[cep]"]').val();
       cep(valor);

        e.preventDefault();
        return false;
    });

    function cep(cep) {
        $.ajax({
            type: "GET",
            url: "http://viacep.com.br/ws/"+cep+"/json/",
            //url: "http://localhost/crud-pdo/web.php",
            beforeSend: function () {
              console.log("Carregando");

            },
            success: function () {
                console.log("Carregado");

            }

        })

            .done(function (data) {
               var localidade = data['localidade'];
                var uf = data['uf'];
               console.log(localidade);

               $('select[name="pessoa[estado]"] option[value='+uf+']').prop('selected', 'selected').change();
                $('select[name="pessoa[cidade]"] option[value="'+localidade+'"]').prop('selected', 'selected').change();

               $('input[name="pessoa[rua]"]').attr("value",data['logradouro']);
                console.log(data);

            });
    }





});