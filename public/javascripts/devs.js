$(function () {
    var $table = $('.dbTable');
    var $name = $('#name');
    var $size = $('#size')
    var $gameID = $('#gameDrop')
    // var $search = $('#search')
    var handleTemplate = "<tr>\n" +
        "            <td>\n" +
        "                {{game}}" +
        "            </td>\n" +
        "            <td>\n" +
        "                {{name}}\n" +
        "            </td>\n" +
        "            <td>\n" +
        "                {{size}}\n" +
        "            </td>\n" +
        "            <td>\n" +
        "                <button type=\"button\" class=\"btn btn-teal btn-rounded btn-sm m-0\" data-id='{{devID}}'>Edit Name</button>\n" +
        "            </td>\n" +
        "            <td>\n" +
        "                <button type=\"button\" class=\"btn btn-info btn-rounded btn-sm m-0 remove\" data-id='{{devID}}'>Remove</button>\n" +
        "            </td>\n" +
        "        </tr>"


    var g_template =
        "<option>{{name}}</option>"


    $("#search").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $(".dbTable tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    })


    function addDev(dev) {
        $table.append(Mustache.render(handleTemplate, dev))
    }

    $.ajax({
        type: 'GET',
        url: '/all-devs',
        success: function (devs) {
            $.each(devs, function (i, dev) {
                    addDev(dev)
                }
            )
        }
    })

    $.ajax({
        type: 'GET',
        url: '/all-games',
        success: function (games) {
            $.each(games, function (i, game) {

                    $gameID.append(Mustache.render(g_template, game))
                }
            )
        }
    })


    $('#addDev').on('click', () => {
        var dev = {
            gameID: $gameID.val(),
            name: $name.val(),
            size: $size.val()
        }
        $.ajax({
            method: 'POST',
            url: '/devs',
            data: dev,
            success: function (result) {

                addDev(result)
            }

        })

            .fail(function () {
                alert('could not add dev')
            })
    })

    //add edit function here

    $table.on('click', '.remove', function () {
        var $tr = $(this).closest('tr')
        $.ajax({
            type: 'delete',
            url: '/devs-del',
            data: {id: $(this).attr('data-id')}

        })
            .done($tr.remove())
    })
})
