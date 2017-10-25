var strHostName = "DemoProject";
var totalButtons = 1;
function JsonToForm(user) {
    var keys = Object.keys(user);
    console.log(keys);
    console.log(user.Name);
    for (var j = 0; j < keys.length; j++) {
        console.log(keys[j]);
        if ($('form div').find("input" + "[name=" + keys[j] + "]").length != 0) {
            $('form div').find("input" + "[name=" + keys[j] + "]").attr('value', user[keys[j]]);
        }
    }
}
$(document).ready(function () {

    $.ajax({
        url: '/' + strHostName + '/Home/PopulateAccountInfo',
        type: 'POST',
        contentType: 'application/json; charset="utf=8"',
        cache: false,
        async: true,
        success: function (user) {
            JsonToForm(user);
        },
        error: function (reply) {
            alert(reply);
        }
    });

    var sections = {
        educationSection: $("#educationSection").addClass('education'),
        workSection: $("#workSection"),
        researchSection: $("#researchSection")
    }
    $('div > label').css({ 'color': "#fff", 'margin': 'auto' });

    $("#addNewSection+ul").on('click', 'li', function () {
        if ($(this).text() == 'Education')
            $(sections.educationSection).css({ "display": "inherit" }).insertBefore("#buttonGroup");
        else if ($(this).text() == 'Work Experience') {
            $(sections.workSection).find('.btn-danger').attr('disabled', true).end().css("display", "inherit").insertBefore("#buttonGroup");
        }
        else if ($(this).text() == 'Research Papers')
            $(sections.researchSection).css("display", "inherit").insertBefore("#buttonGroup");
    });



    $("#deleteSection").on('click', function (e) {
        if ($(this).parent().parent().prev().hasClass('undeleteable')) {
            console.log("Sorry, you can't delete any row beyond this point.");
        }
        else
            $(this).parent().parent().prev().remove();
    });

    $("#formDiv").on('click', '#addExtraSkills', function () {
        totalButtons += 1;
        var parent = $(this).parent().parent();
        $(parent).find('.btn-danger').attr('disabled', false).end().clone().appendTo("#workSection");
        $(this).prop('disabled', true);
    });

    $("#formDiv").on('click', '#deleteExtraSkills', function () {
        var prev = $(this).parent().parent().prev();
        var next = $(this).parent().parent().next();
        console.log($(prev).attr('id'));
        console.log($(next).attr('id'));
        if (totalButtons == 2) {
            if ($(prev).prev().is('h3')) {
                $(next).find('.btn-primary').attr('disabled', false);
                $(next).find('.btn-danger').attr('disabled', true);
            }
            else {
                $(prev).find('.btn-primary').attr('disabled', false);
                $(prev).find('.btn-danger').attr('disabled', true);
            }
            $(this).parent().parent().remove();
        }
        else
            if ($(prev).attr('id') == 'skillAndMoreRow' && $(next).attr('id') == 'skillAndMoreRow') {
            }
            else {
                $(prev).find('.btn-primary').attr('disabled', false);
            }
        $(this).parent().parent().remove();
        totalButtons -= 1;
        //$(this).parent().parent().prev().find('.btn').attr('disabled', false);

    });

    $("#updateAccountButton").on('click', function () {
        var formData = JSON.stringify($("form").serialize());
        $.ajax({
            url: '/' + strHostName + '/Home/FinalizeUpdateAccount',
            type: 'POST',
            contentType: 'application/json; charset=utf8',
            data: formData,
            async: true,
            cache: false,
            success: function (reply) {
                alert("ajax successful.\nReply:" + reply);
            },
            error: function (reply) {
                alert("ajax failed!\nReply:" + reply);
            }
        });
    });
});