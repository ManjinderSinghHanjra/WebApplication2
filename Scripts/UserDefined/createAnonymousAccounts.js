var strHostName = "DemoProject";
var buttonCount = 1;
$(document).ready(function () {
    $("#mainForm:first-child").find('.btn-danger').attr('disabled', true);
   
    $("#addButton").on('click', function (e) {
        e.preventDefault();
        var row = $(this).parent().parent().parent();
        $(row).find('.btn-danger').attr('disabled', false);
        var clone = $(row).clone(true, true);
        $(clone).find(':input').each(function () {
            $(this).val(" ");
        });
        $(clone).insertAfter(row);
        buttonCount += 1;
        $(this).attr('disabled', true);
    });

    $("#removeButton").on('click', function (e) {
        var next = $(this).parent().parent().parent().next();
        if (buttonCount == 2) {
            if ($(next).hasClass('submitButtonClass') == true) {
                $("#mainForm:first-child").find('.btn-danger').attr('disabled', true);
                $("#mainForm:first-child").find('.btn-info').attr('disabled', false);
            }
            else {
                $("#mainForm:first-child").find('.btn-danger').attr('disabled', true);
            }
            $(this).parent().parent().parent().remove();
            buttonCount -= 1;
        }
        else
        if ($(next).hasClass('submitButtonClass') == true) {
            $(this).parent().parent().parent().prev().find('.btn-info').attr('disabled', false);
            $(this).parent().parent().parent().remove();
            buttonCount -= 1;

        }
        else {
            $(this).parent().parent().parent().remove();
            buttonCount -= 1;
        }
    });

    $("#submitButton").on('click', function () {
        var json = [];
        $("#mainForm .formData").each(function (n) {
            var item = '{';
            $(this).find("input[type=text]").each(function (number) {
                item += "'" + $(this).attr('name') + "'" + ':' + "'" + $(this).val() + "'";
                if(number<2)
                {
                    item += ',';
                }
            });
            item += '}';
            json.push(JSON.stringify(item));
            //item += (item == "" ? "" : ("{" + item + "}"));
            //json += item + (json == "" ? "" : ",");
        });
        $.ajax({
            url: "/" + strHostName + "/Home/FinalizeUpdateAccount",
            data: '{"user":'  + '["' + json  + '"]' +'}',
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