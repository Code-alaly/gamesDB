
$(function () {
    var $table = $('.dbTable');
    var $name = $('name');
    var $copies = $('copies')
    var $year = $('year')


    function addGame(game) {
        $table.append($("<tr>")
            .append($("<td>").append(game.name))
            .append($("<td>").append(game.releaseYear))
            .append($("<td>").append(game.copiesSold))
            .append($("<buttontype=\"button\" class=\"btn btn-info btn-rounded btn-sm m-0\" action=\"games\" >").append('Remove')))
    }

    $.ajax({
        type: 'GET',
        url: '/all-games',
        success: function (games){
            $.each(games, function (i, game) {

            addGame(game)
        })
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
            data: game

        })
            .done(function (content) {
                addGame(content)
            })
            .fail(function () {
                alert('could not add order')
            })
    })
})
