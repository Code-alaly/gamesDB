$(function () {
    var $table = $('.dbTable');
    var $name = $('#name');
    var $size = $('#size')
    var $gameID = $('#gameID')
    // var $search = $('#search')
    var handleTemplate =
        "" +
        "<tr>" +
        "<td>{{gameID}}</td>" +
        "<td>{{name}}</td>" +
        "<td>{{size}}</td>" +
        "<td><button type="button" class="btn btn-teal btn-rounded btn-sm m-0">Edit Name</button></td>" +
        "<td><button type='button' class='btn btn-info btn-rounded btn-sm m-0 remove' data-id='{{gameID}}'>Remove</button></td>" +
        "</tr>"


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
/
                    addDev(dev)
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