$(function () {
    var $table = $('.dbTable');
    var $name = $('#gameDrop');
    var $comment = $('#comment')
    var $rate = $('#rate')
    var handleTemplate = "<tr>\n" +
        "    <td>\n" +
        "        {{game}}\n" +
        "    </td>\n" +
        "    <td>\n" +
        "        {{content}}\n" +
        "    </td>\n" +
        "    <td>\n" +
        "        {{rating}}\n" +
        "    </td>\n" +
        "    <td>\n" +
        "        <button type=\"button\" class=\"btn btn-teal btn-rounded btn-sm m-0 togg\" data-id=\"{{reviewID}}\">Edit Name</button>\n" +
        "    </td>\n" +
        "    <td>\n" +
        "        <button type=\"button\" class=\"btn btn-info btn-rounded btn-sm m-0 remove\" data-id=\"{{reviewID}}\">Remove</button>\n" +
        "    </td>\n" +
        "</tr>\n" +
        "<tr style='display: none' class='edit'>\n" +
        "    <td>\n" +
        "                <span>\n" +
        "                Review:\n" +
        "            </span>\n" +
        "        <input class=\" form-control content\">\n" +
        "    </td>\n" +
        "    <td>\n" +
        "                <span>\n" +
        "                    Rating:\n" +
        "                </span>\n" +
        "        <select class=\"form-control rating\">\n" +
        "            <option>1</option>\n" +
        "            <option>2</option>\n" +
        "            <option>3</option>\n" +
        "            <option>4</option>\n" +
        "            <option>5</option>\n" +
        "        </select>\n" +
        "    </td>\n" +
        "    <td>\n" +
        "        <button type=\"button\" class=\"btn btn-teal btn-rounded btn-sm m-0 change\" data-id=\"{{reviewID}}\">Submit</button>\n" +
        "    </td>\n" +
        "    <td>\n" +
        "        <button type=\"button\" class=\"btn btn-info btn-rounded btn-sm m-0 cancel\" >Cancel</button>\n" +
        "    </td>\n" +
        "</tr>"

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
        "                <select class=\"form-control rating\">\n" +
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

    togg = function (input) {
        $(input).on('click', function () {

        })
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
            url: '/reviews-del',
            data: {id: $(this).attr('data-id')}

        })
            .done($tr.remove())
    })

    var toggleFun = function  (cont) {
        return $(cont).closest('tr')
    }

    $table.on('click', '.togg', function () {
        // var
        toggleFun(this).next('.edit').toggle()

    })
    $table.on('click', '.cancel', function () {
        // var
        toggleFun(this).toggle()

    })
    $table.on('click', '.change', function () {
        $tr = $(this).closest('tr')
        $done = $tr.prev()

        var content = $(this).closest('tr').find('.content').val()
        var theRating = $(this).closest('tr').find('.rating').val()
        var review = {
            reviewID: $(this).attr('data-id'),
            content: content,
            rating: theRating
        }
        $.ajax({
            type: 'put',
            data: review,
        })
            .done($tr.toggle(),
                jQuery($done).find("td:eq(2)").html(theRating),
                jQuery($done).find("td:eq(1)").html(content)
            )


    })
})
