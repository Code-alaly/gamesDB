$(function () {
    var $table = $('.dbTable');
    var $name = $('#gameDrop');
    var $comment = $('#comment')
    var $rate = $('#rate')
    var handleTemplate =
            "<tr>\n" +
            "            <td>\n" +
            "                {{game}}\n" +
            "            </td>\n" +
            "            <td>\n" +
            "                {{content}}\n" +
            "            </td>\n" +
            "            <td>\n" +
            "                {{rating}}\n" +
            "            </td>\n" +
            "            <td>\n" +
            "                <button type=\"button\" class=\"btn btn-teal btn-rounded btn-sm m-0\">Edit Name</button>\n" +
            "            </td>\n" +
            "            <td>\n" +
            "                <button type=\"button\" class=\"btn btn-info btn-rounded btn-sm m-0\">Remove</button>\n" +
            "            </td>\n" +
            "        </tr>"
    var g_template =
        "<option>{{name}}</option>"
        // $(".reviews").html()

        function addGame(game) {
        $table.append(Mustache.render(handleTemplate, game))

    }

    $.ajax({
        type: 'GET',
        url: '/all-reviews',

    })
        .done(function (games) {
            $.each(games, function (i, game) {

                addGame(game)
            })
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


    $('#addGame').on('click', () => {
        var game = {
            name: $name.val(),
            content: $comment.val(),
            rating: $rate.val()
        }
        $.ajax({
            method: 'POST',
            url: '/reviews',
            data: game

        })
            .done(function (content) {
                addGawme(content)
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
