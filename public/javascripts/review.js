$(function () {
    var $table = $('.dbTable');
    var $name = $('game');
    var $comment = $('comment')
    var $rate = $('rate')
    var handleTemplate = $("#reviews").html()

    function addGame(game) {
        $table.append(Mustache.render(handleTemplate, game))
    }

    $.ajax({
        type: 'GET',
        url: '/all-games',

    })
        .done(function (games) {
            $.each(games, function (i, game) {

                addGame(game)
            })
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
            data: game

        })
            .done(function (content) {
                addGame(content)
            })
            .fail(function () {
                alert('could not add order')
            })
    })
    $table.on('click', '.remove', function () {
        var $tr = $(this).closest('tr')
        $.ajax({
            type: 'delete',
            url: '/games-del',
            data: {id: $(this).attr('data-id')}

        })
            .done($tr.remove())
    })
})
