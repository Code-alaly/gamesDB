$(function () {
    var $table = $('.dbTable');
    var $name = $('#name');
    var $description = $('#description')
    // var $search = $('#search')
    var handleTemplate =
        "" +
        "<tr>" +
        "<td>{{name}}</td>" +
        "<td>{{description}}</td>" +
        "<td><button type='button' class='btn btn-info btn-rounded btn-sm m-0 remove' data-id='{{genreID}}'>Remove</button></td>" +
        "</tr>"


    $("#search").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $(".dbTable tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    })


    function addGenre(genre) {
        $table.append(Mustache.render(handleTemplate, genre))
    }

    $.ajax({
        type: 'GET',
        url: '/all-genres',
        success: function (genres) {
            $.each(genres, function (i, genre) {

                    addGenre(genre)
                }
            )
        }
    })



    $('#addGenre').on('click', () => {
        var genre = {
            name: $name.val(),
            description: $description.val()
        }
        $.ajax({
            method: 'POST',
            url: '/genres',
            data: genre,
            success: function (result) {

                addGenre(result)
            }

        })

            .fail(function () {
                alert('could not add genre')
            })
    })
    $table.on('click', '.remove', function () {
        var $tr = $(this).closest('tr')
        $.ajax({
            type: 'delete',
            url: '/genres-del',
            data: {id: $(this).attr('data-id')}

        })
            .done($tr.remove())
    })
})
