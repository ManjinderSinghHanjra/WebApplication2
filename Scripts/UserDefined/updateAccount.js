var sections = {
    educationSection: $("#educationSection"),
    workSection: $("#workSection"),
    researchSection: $("#researchSection")
}
$(document).ready(function () {
    
    $('div > label').css({ 'color': "#fff", 'margin': 'auto' });

    $("#addNewSection+ul").on('click', 'li', function () {
        if ($(this).text() == 'Education')
            $(sections.educationSection).css("display","inherit").insertBefore("#buttonGroup");
        else if ($(this).text() == 'Work Experience')
            $(sections.workSection).css("display","inherit").insertBefore("#buttonGroup");
        else if ($(this).text() == 'Research Papers')
            $(sections.researchSection).css("display", "inherit").insertBefore("#buttonGroup");
    });



    $("#deleteSection").on('click', function (e) {
        if ($(this).parent().parent().prev().hasClass('undeleteable'))
        {
            console.log("Sorry, you can't delete any row beyond this point.");
        }
        else
        $(this).parent().parent().prev().remove();
    });

    $("#formDiv").on('click', '#addExtraSkills', function () {
        var parent = $(this).parent().parent();
        $(parent).clone().appendTo("#workSection");
        $(this).prop('disabled', true);
    });

    $("#formDiv").on('click', '#deleteExtraSkills', function () {
        console.log($(this).parent().parent().prev().find('.btn').attr('disabled', false));
        $(this).parent().parent().remove();
    });

});