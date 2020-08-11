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
            "                <button type=\"button\" class=\"btn btn-teal btn-rounded btn-sm m-0 edit\">Edit Name</button>\n" +
            "            </td>\n" +
            "            <td>\n" +
            "                <button type=\"button\" class=\"btn btn-info btn-rounded btn-sm m-0 remove\" data-id='{{reviewID}}'>Remove</button>\n" +
            "            </td>\n" +
            "        </tr>"
    var g_template =
        "<option>{{name}}</option>"

    var editTemplate = " <tr>\n" +
        "            <td>\n" +
        "                <span>\n" +
        "                Review:\n" +
        "            </span>\n" +
        "                <input class=\" form-control name\">\n" +
        "            </td>\n" +
        "            <td>\n" +
        "                <span>\n" +
        "                    Rating:\n" +
        "                </span>\n" +
        "                <select class=\"form-control rate\">\n" +
        "                    <option>1</option>\n" +
        "                    <option>2</option>\n" +
        "                    <option>3</option>\n" +
        "                    <option>4</option>\n" +
        "                    <option>5</option>\n" +
        "                </select>\n" +
        "            </td>\n" +
        "            <td>\n" +
        "                <button type=\"button\" class=\"btn btn-teal btn-rounded btn-sm m-0\">Submit</button>\n" +
        "            </td>\n" +
        "            <td>\n" +
        "                <button type=\"button\" class=\"btn btn-info btn-rounded btn-sm m-0\" >Cancel</button>\n" +
        "            </td>\n" +
        "        </tr>"
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
            url: '/reviews-del',
            data: {id: $(this).attr('data-id')}

        })
            .done($tr.remove())
    })

    $table.on('click', '.edit', function () {
        var $tr = $(this).closest('tr')
        $tr.append(editTemplate)
        // $.ajax({
        //     type: 'delete',
        //     url: '/reviews-del',
        //     data: {id: $(this).attr('data-id')}
        //
        // })
            // .done($tr.remove())
    })
})
