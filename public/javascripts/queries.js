$(function () {
    var $table = $('dbTable');
    var $name = $('name');
    var $copies = $('copies')
    var $year = $('year')

    var tableTemp = ""

    function addGame() {

    }

    $.ajax({
        type: 'GET',
        url: '/games',
    })
        .done(function (games) {
            $.each(games, function (i, game) {
                addGame(game)
            })
        })
        .fail( function () {alert('error has been had!')})

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
            .done(function (content){
                addGame(content)
            })
            .fail(function () {
                alert('could not add order')
            })
    })
})
