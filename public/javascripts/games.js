
$(function () {
    var $table = $('dbTable');
    var $name = $('name');
    var $copies = $('copies')
    var $year = $('year')
    // var template = Handlebars.compile()
    // var tableTemp ="<tr><td>{{name}}</td><td>{{copiesSold}}</td><td>{{releaseYear}}</td><td>" +
    //     "<button>Remove</button></td></tr>"



        function addGame(game) {
            // $('dbTable').append($("<tr>")
            //     .append($("<td>").append(game.name))
            //     .append($("<td>").append(game.copiesSold))
            //     .append($("<td>").append(game.year))
            //     .append($("<button>"))
            var template = $('#games-temp').html()

            var templateScript = Handlebars.compile(template)

            var html = templateScript(games)
            $('dbTable').append(html)

        }

    $.ajax({
        type: 'GET',
        url: '/all-games'
    })
        .done(function (games) {

            $.each(games, function (i, game) {
                addGame(game)
            })
        })
        .fail(function () {
            alert('error has been had!')
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
