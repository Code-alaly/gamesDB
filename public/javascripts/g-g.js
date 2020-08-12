$(function () {
    var $table = $('.dbTable');
    var $name = $('#name');
    var $genre = $('#genre')
    // var $search = $('#search')
    var handleTemplate =
        "" +
        "<tr>" +
        "<td>{{name}}</td>" +
        "<td>{{genre}}</td>" +
        "<td><button type='button' class='btn btn-info btn-rounded btn-sm m-0 remove' data-id='{{ggID}}'>Remove</button></td>" +
        "</tr>"

    var g_template =
        "<option>{{name}}</option>"
    $("#search").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $(".dbTable tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    })


    function addGame(game) {
        $table.append(Mustache.render(handleTemplate, game))
    }

    $.ajax({
        type: 'GET',
        url: '/all-gg',
        success: function (games) {
            $.each(games, function (i, game) {

                    addGame(game)
                }
            )
        }
    })

    $.ajax({
        type: 'GET',
        url: '/all-games',
        success: function (games) {
            $.each(games, function (i, game) {

                    $name.append(Mustache.render(g_template, game))
                }
            )
        }
    })
    $.ajax({
        type: 'GET',
        url: '/all-genres',
        success: function (games) {
            $.each(games, function (i, game) {

                    $genre.append(Mustache.render(g_template, game))
                }
            )
        }
    })

    $('#addGame').on('click', () => {
        var game = {
            name: $name.val(),
            copies: $copies.val(),
            year: $year.val()
        }
        $.ajax({
            method: 'POST',
            url: '/games',
            data: game,
            success: function (result) {

                addGame(result)
            }

        })

            .fail(function () {
                alert('could not add order')
            })
    })
    $table.on('click', '.remove', function () {
        var $tr = $(this).closest('tr')
        $.ajax({
            type: 'delete',
            url: '/gg-del',
            data: {id: $(this).attr('data-id')}

        })
            .done($tr.remove())
    })
})
