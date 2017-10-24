var strHostName = "DemoProject";
$(document).ready(function () {
    $("#mainForm:first-child").find('.btn-danger').attr('disabled', true);
    //$("#mainForm:not(:last-child)").each(function () {
    //    $(this).find('.btn-danger').attr('disabled', true);
    //    $(this).find('.btn-info').attr('disabled', true);
    //});
    $("#addButton").on('click', function (e) {
        e.preventDefault();
        var row = $(this).parent().parent().parent();
        var clone = $(row).clone(true, true);
        $(clone).find('.btn-danger').attr('disabled', false);
        $(clone).find(':input').each(function () {
            $(this).val("");
        });
        $(clone).insertAfter(row);
        $(this).attr('disabled', true);
        $(this).parent().next().find('.btn-danger').attr('disabled', true);
    });

    $("#removeButton").on('click', function (e) {
        var prev = $(this).parent().parent().parent().prev();
        if (!$(prev).is('h3')) {
            prev.find('.btn-info').attr('disabled', false);
            prev.find('.btn-danger').attr('disabled', false);
            $(this).parent().parent().parent().remove();
            parent = $(this).parent().parent().parent();
            $(parent)
        }
        else {
        }
    });

    $("#submitButton").on('click', function () {
        var data = [];
        $("#mainForm .formData").each(function (n) {
            var item = {};
            item['Name'] = $(this).find('#Name').val();
            item['EmailID'] = $(this).find('#EmailID').val();
            item['Password'] = $(this).find('#Password').val();
            data.push(item);
        });
        $.ajax({
            url: "/" + strHostName + "/Home/FinalizeUpdateAccount",
            data: JSON.stringify({user: data }),
            async: true,
            contentType: 'application/json; charset=utf-8',
            type: 'POST',
            cache: false,
            success: function(reply)
            {
               alert('ajax call successful\n' + 'Reply: ' + JSON.stringify(reply));
            },
            error: function (reply) {
                alert('ajax call failed!\n' + 'Reply: ' + JSON.stringify(reply));
            }
        });
    });


});