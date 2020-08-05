
$(function () {
    var $table = $('.dbTable');
    var $name = $('name');
    var $copies = $('copies')
    var $year = $('year')
    var handleTemplate = "" +
    "<tr>" +
        "<button>Remove</button>"+
        "<td>{{name}}</td>" +
        "<td>{{releaseYear}}</td>" +
        "<td>{{copiesSold}}</td>" +
        "<td><button type='button' class='btn btn-info btn-rounded btn-sm m-0 remove' data-id='{{gameID}}'>Remove</button></td>"+
        "</tr>"

    function addGame(game) {
        $table.append(Mustache.render(handleTemplate, game))
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
    $table.on('click', '.remove',function (){
        var $tr = $(this).closest('tr')
        $.ajax({
            type: 'delete',
            url: '/games-del',
            data: {id: $(this).attr('data-id')}

        })
            .done($tr.remove())
    })
})
