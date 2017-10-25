var strHostName = "DemoProject";
var rowCount = 1;
var formRow;
function cloneAButtonRow(button) {
    var row = $(button).parent().parent().parent();
    $(row).find('.btn-danger').attr('disabled', false);
    var clone = $(row).clone(true, true);
    $(clone).find(':input').each(function () {
        $(this).val(" ");
    });
    return clone;
}

function FormToJson(form, json) {
    var json = "";
    $(form).each(function (n) {
        var item = '{';
        $(this).find("input[type=text]").each(function (number) {
            item += (item == '{' ? '' : ',') + ('"' + $(this).attr('name') + '"' + ':' + '"' + $(this).val() + '"');

        });
        item += '}';
        json += (json == "" ? "" : ",") + item;
    });
    return json;
}

function JsonToForm(reply) {
    var data = JSON.parse(reply);
    var keys = Object.keys(data[0]);
    for (var i in data) {
        var clone = $(formRow).clone(true, false);
        for (var j = 0; j < keys.length; j++) {
            if ($(clone).find("input" + "[name=" + keys[j] + "]").length != 0) {
                $(clone).find("input" + "[name=" + keys[j] + "]").val(data[i][keys[j]]);
                $(clone).insertAfter('h3');
            }
        }
        rowCount += 1;
    }
    $("#mainForm .formData").find('.btn-danger, .btn-info').each(function () {
        $(this).attr('disabled', false);
    })
    $("#mainForm .formData").find('.btn-info').each(function (n) {
        if (n == $("#mainForm .formData").length - 2)
        {
            $(this).parent().attr('disabled', false);
        }
        else
        if (n == $("#mainForm .formData").length - 1)
        {
            $(this).parent().parent().parent().remove();
        }
        else
        $(this).attr('disabled', true);
    });
}

$(document).ready(function () {

    formRow = $(".formData");
    $(formRow).css('display','inherit').find('.btn-danger').attr('disabled', true).end().insertAfter('h3');
    $("#fetchDataButton").on('click', function () {
 
        $.ajax({
            url: '/' + strHostName + '/Home/AnonymousAccountInfo',
            type: 'POST',
            data: '{"count":' + 10 + '}',
            contentType: 'application/json; charset=utf-8',
            success: function (reply) {
                JsonToForm(reply);
            },
            error: function (reply) {
                alert("ajax error :\n" + reply);
            }
        });
    });
    
    $("#mainForm").on('click', 'div #addButton', function (e) {
        e.preventDefault();
        var row = $(this).parent().parent().parent();
        var clone = cloneAButtonRow(this);
        $(clone).insertAfter(row);
        $(this).attr('disabled', true);
    });

    $("#mainForm").on('click', "div #removeButton", function (e) {
        var next = $(this).parent().parent().parent().next();
        rowCount -= 1;
        var x = $("#mainForm .formData").length;
        if ( x  <= 2) {
            if ($(next).hasClass('submitButtonClass') == true) {
                $("#mainForm:first-child").find('.btn-danger').attr('disabled', true);
                $("#mainForm:first-child").find('.btn-info').attr('disabled', false);
            }
            else {
                $("#mainForm:first-child").find('.btn-danger').attr('disabled', true);
            }
            $(this).parent().parent().parent().remove();
            
        }
        else
            if ($(next).hasClass('submitButtonClass') == true) {
                $(this).parent().parent().parent().prev().find('.btn-info').attr('disabled', false);
                $(this).parent().parent().parent().remove();
            }
            else {
                $(this).parent().parent().parent().remove();
            }

        var userEmail = [];
        var email = $(this).parent().parent().parent().find('input[name=EmailID]').val();
        if (email == "" || email == " ")
        {
            return;
        }
        userEmail.push(email);
        $.ajax({
            url: "/" + strHostName + "/Home/DeleteEmail",
            data: JSON.stringify({"listUserEmails":userEmail}),
            async: true,
            contentType: 'application/json; charset=utf-8',
            type: 'POST',
            cache: false,
            success: function (reply) {
                alert('ajax call successful\n' + 'Reply: ' + JSON.stringify(reply));
            },
            error: function (reply) {
                alert('ajax call failed!\n' + 'Reply: ' + JSON.stringify(reply));
            } 
        });
        
    });

    $("#submitButton").on('click', function () {
        var json = FormToJson($("#mainForm .formData"), json);
        $.ajax({
            url: "/" + strHostName + "/Home/FinalizeUpdateAccount",
            data: '{"user":[' + json + ']}',
            async: true,
            contentType: 'application/json; charset=utf-8',
            type: 'POST',
            cache: false,
            success: function (reply) {
                alert('ajax call successful\n' + 'Reply: ' + JSON.stringify(reply));
            },
            error: function (reply) {
                alert('ajax call failed!\n' + 'Reply: ' + JSON.stringify(reply));
            }
        });
    });


});