var strHostName = "DemoProject";
var totalButtons = 0;
var sections;
var keysEducationRow = ['University', 'Specialization', 'Marks'];
var keysExperienceRow = ['Organisation', 'Skills', 'Acheivements'];
var keysResearchRow = ['Paper', 'Mentions', 'Hyperlink'];

function JsonToForm(user) {
    var keys = Object.keys(user);
    var noOfEducationRows = user['List_Education'] == null ? 0 : user['List_Education'].length;
    var noOfExperienceRows = user['List_WorkExperience'] == null ? 0 : user['List_WorkExperience'].length;
    var noOfResearchRows = user['List_ResearchContribution'] == null ? 0 : user['List_ResearchContribution'].length;

    for (var j = 0; j < keys.length; j++) {
        if ($('form div').find("input" + "[name=" + keys[j] + "]").length != 0) {
            $('form div').find("input" + "[name=" + keys[j] + "]").attr('value', user[keys[j]]);
        }
    }

    if (noOfEducationRows != 0)
    {
        $(sections.educationSection).clone().attr('index', j).css({ "display": "inherit" }).insertBefore("#buttonGroup");
    }
    if (noOfExperienceRows != 0) {
        $($(sections.workSection).clone()).css({ "display": "inherit" }).insertBefore("#buttonGroup");
    }
    if (noOfResearchRows != 0) {
        $($(sections.researchSection).clone()).css({ "display": "inherit" }).insertBefore("#buttonGroup");
    }


    for (var j = 0; j < noOfEducationRows; j++) {
        var clone = $(sections.educationSectionRow).clone().attr('index', j).css({ "display": "inherit" });
        for (var x = 0; x < keysEducationRow.length; x++) {
            $(clone).find('input[name=' + keysEducationRow[x] + ']').val(user['List_Education'][j][keysEducationRow[x]]);
        }
        $(clone).appendTo("form #educationSection");
    }
    for (var j = 0; j < noOfExperienceRows; j++) {
        var clone = $(sections.workSectionRow).clone().attr('index', j).css({ "display": "inherit" });
        for (var x = 0; x < keysExperienceRow.length; x++) {
            $(clone).find('input[name=' + keysExperienceRow[x] + ']').val(user['List_WorkExperience'][j][keysExperienceRow[x]]);
        }
        $(clone).appendTo("form #workSection");
        totalButtons += 1;
    }
    for (var j = 0; j < noOfResearchRows; j++) {
        var clone = $(sections.researchSectionRow).clone().attr('index', j).css({ "display": "inherit" });
        for (var x = 0; x < keysResearchRow.length; x++) {
            $(clone).find('input[name=' + keysResearchRow[x] + ']').val(user['List_ResearchContribution'][j][keysResearchRow[x]]);
        }
        $(clone).appendTo("form #researchSection");
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

    sections = {
        educationSection: $("#educationSection").addClass('education'),
        educationSectionRow: $(".educationSectionRow"),
        workSection: $("#workSection"),
        workSectionRow: $(".workSectionRow"),
        researchSection: $("#researchSection"),
        researchSectionRow: $(".researchSectionRow")
    }

    // Make all labels colored in white
    $('div > label').css({ 'color': "#fff", 'margin': 'auto' });

    // Click handler on the dropdown in AddNewSection
    $("#addNewSection+ul").on('click', 'li', function () {
        if ($(this).text() == 'Education')
            $(sections.educationSection).css({ "display": "inherit" }).insertBefore("#buttonGroup");
        else if ($(this).text() == 'Work Experience') {
            $(sections.workSection).css("display", "inherit").insertBefore("#buttonGroup");
        }
        else if ($(this).text() == 'Research Papers')
            $(sections.researchSection).css("display", "inherit").insertBefore("#buttonGroup");
    });


    // Click handler on the DeleteSection Button
    $("#deleteSection").on('click', function (e) {
        if ($(this).parent().parent().prev().hasClass('undeleteable')) {
            console.log("Sorry, you can't delete any row beyond this point.");
        }
        else
            $(this).parent().parent().prev().remove();
    });

   
    $("#formDiv").on('click', '#addExtraSkills', function () {
        totalButtons += 1;
        var index = $(this).closest('.workSectionRow').attr('index');
        var clone = $(sections.workSectionRow).clone(true, true).attr('index', parseInt(index)+1).css({ "display": "inherit" });
        $(clone).appendTo("#workSection");
        $(this).prop('disabled', true);
    });

    $("#formDiv").on('click', '#deleteExtraSkills', function () {
        if (totalButtons <= 2)
        {
            $(this).parent().parent().parent().prev().find('.btn-danger').attr('disabled', true);
        }
        $(this).parent().parent().parent().remove();
        totalButtons -= 1;
    });

    $("#updateAccountButton").on('click', function () {
        var user = "";
        var List_Education = "", List_WorkExperience = "", List_ResearchContribution = "";
        $('.mandatory').find('input').each(function () {
                user += (user == "" ? "" : ",") + '"'+ $(this).attr('name') + '":"' + $(this).val() + '"';
        });
        user += ',';
        console.log(user + "\n");
        if ($('form #educationSection, #workSection, #researchSection').length != 0)
        {
            $('form #educationSection').each(function () {
                var education = '';
                $(this).find('input').each(function () {
                    education += education == '' ? '' : ',';
                    education +=  '"'+ [$(this).attr('name')] + '":"'  + $(this).val() + '"';
                });
                education += '}';
                List_Education += (List_Education == "" ? "" : ",") +  (education);
            });
            $('form #workSection').each(function () {
                var experience = '{';
                $(this).find('input').each(function () {
                    experience += experience == '{' ? '' : ',';
                    experience +=  '"' + [$(this).attr('name')] + '":"' + $(this).val() + '"';
                });
                experience += '}';
                List_WorkExperience += (List_WorkExperience == "" ? "" : ",") + (experience);
            });
            $('form #researchSection').each(function () {
                var research = '{';
                $(this).find('input').each(function () {
                    research += research == '{' ? '' : ',';
                    research +=  '"' + [$(this).attr('name')] + '":"' + $(this).val() + '"';
                });
                research += '}';
                List_ResearchContribution += (List_ResearchContribution == "" ? "" : ",") + (research);
            });
        }
        else
        {
            // Don't add anything to EducationData;
        }
        user += '"List_Education":[' + (List_Education) + '],';
        user += '"List_WorkExperience":[' + List_WorkExperience +'],';
        user += '"List_ResearchContribution":[' + List_ResearchContribution + ']';
        $.ajax({
            url: '/' + strHostName + '/Home/UpdateUserCommit',
            type: 'POST',
            contentType: 'application/json; charset=utf8',
            data: '{"user":{' + user + '}}',
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