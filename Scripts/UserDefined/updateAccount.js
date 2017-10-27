var strHostName = "DemoProject";
var totalButtons = 0;
var sections;
var keysEducationRow = ['University', 'Specialization', 'Marks'];
var keysExperienceRow = ['Organisation', 'Skills', 'Acheivements'];
var keysResearchRow = ['Paper', 'Mentions', 'Hyperlink'];


/* Fill the User Information Json to this function and it'll dynamically generate all the form & its sections for the UserBoard html page. */
function JsonToForm(user) {
    // Getting all the keys inside the User Data will help us to find how many sections are there & is also helping in dynamically matching the User Data Key Names with the Html Form names to fill in the data.
    var keys = Object.keys(user);
    var noOfEducationRows = user['List_Education'] == null ? 0 : user['List_Education'].length;
    var noOfExperienceRows = user['List_WorkExperience'] == null ? 0 : user['List_WorkExperience'].length;
    var noOfResearchRows = user['List_ResearchContribution'] == null ? 0 : user['List_ResearchContribution'].length;

    // Creates the mandatory section of the form. The DOM targeted here is [ form div inputs ]
    for (var j = 0; j < keys.length; j++) {
        if ($('form div').find("input" + "[name=" + keys[j] + "]").length != 0) {
            $('form div').find("input" + "[name=" + keys[j] + "]").attr('value', user[keys[j]]);
        }
    }

    // Checks if any section is present in the json data or not. If present then will create the section in the html.
    // .find('.sectionRow').remove() removes the sectionRow inside it because we want all rows to be filled by using loop constructs and don't want any row existing in prior inside the parent [.section].
    if (noOfEducationRows != 0) {
        // Creates #educationSection
        $(sections.educationSection).clone().find('.sectionRow').remove().end().attr('index', j).css({ "display": "inherit" }).insertBefore("#buttonGroup");
    }
    if (noOfExperienceRows != 0) {
        // Creates #workSection
        $($(sections.workSection).clone()).find('.sectionRow').remove().end().attr('index', j).css({ "display": "inherit" }).insertBefore("#buttonGroup");
    }
    if (noOfResearchRows != 0) {
        // Creates #researchSection
        $($(sections.researchSection).clone()).find('.sectionRow').remove().end().attr('index', j).css({ "display": "inherit" }).insertBefore("#buttonGroup");
    }


    // Creates [.educationSectionRow] and appends it to the [form #educationSection]. The new DOM will be [form #educationSection>.educationSectionRow]
    // If loop ensures if we have to able/disable the buttons in a specific manner within rows which are consecutively being added below others.
    // .attr(index, j) sets up the index of every single that is being added on the go
    for (var j = 0; j < noOfEducationRows; j++) {
        var clone = $(sections.educationSectionRow).clone().attr('index', j).css({ "display": "inherit" });
        for (var x = 0; x < keysEducationRow.length; x++) {
            $(clone).find('input[name=' + keysEducationRow[x] + ']').val(user['List_Education'][j][keysEducationRow[x]]);

        }
        if (j == noOfEducationRows - 1) {
            $(clone).find('.btn-danger').attr('disabled', false);
            $(clone).find('.btn-primary').attr('disabled', false);

        }
        else {
            $(clone).find('.btn-danger').attr('disabled', false);
            $(clone).find('.btn-primary').attr('disabled', true);
        }
        $(clone).appendTo("form #educationSection");
    }
    for (var j = 0; j < noOfExperienceRows; j++) {
        var clone = $(sections.workSectionRow).clone().attr('index', j).css({ "display": "inherit" });
        for (var x = 0; x < keysExperienceRow.length; x++) {
            $(clone).find('input[name=' + keysExperienceRow[x] + ']').val(user['List_WorkExperience'][j][keysExperienceRow[x]]);

        }
        if (j == noOfExperienceRows - 1) {
            $(clone).find('.btn-danger').attr('disabled', false);
            $(clone).find('.btn-primary').attr('disabled', false);

        }
        else {
            $(clone).find('.btn-danger').attr('disabled', false);
            $(clone).find('.btn-primary').attr('disabled', true);
        }
        $(clone).appendTo("form #workSection");
    }
    for (var j = 0; j < noOfResearchRows; j++) {
        var clone = $(sections.researchSectionRow).clone().attr('index', j).css({ "display": "inherit" });
        for (var x = 0; x < keysResearchRow.length; x++) {
            $(clone).find('input[name=' + keysResearchRow[x] + ']').val(user['List_ResearchContribution'][j][keysResearchRow[x]]);

        }
        if (j == noOfResearchRows - 1) {
            $(clone).find('.btn-danger').attr('disabled', false);
            $(clone).find('.btn-primary').attr('disabled', false);

        }
        else {
            $(clone).find('.btn-danger').attr('disabled', false);
            $(clone).find('.btn-primary').attr('disabled', true);
        }
        $(clone).appendTo("form #researchSection");
    }
}



// On ready execution
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

    // The sections & sectionRows are contained inside sections object, so to make cloning fast and easy.
    sections = {
        educationSection: $("#educationSection"),
        educationSectionRow: $(".educationSectionRow"),
        workSection: $("#workSection"),
        workSectionRow: $(".workSectionRow"),
        researchSection: $("#researchSection"),
        researchSectionRow: $(".researchSectionRow")
    }

    // Make all labels colored in white
    $('div > label').css({ 'color': "#fff", 'margin': 'auto' });

    // Click handler on the dropdown in AddNewSection
    // if construct checks if there's already any section present in the page, if no, then creates an entire new [section] and sets up the index of the inner [sectionRow] to be 0
    $("#addNewSection+ul").on('click', 'li', function () {
        if ($(this).text() == 'Education') {
            if ($("form").find('#educationSection').length == 0)
                $(sections.educationSection).css("display", "inherit").find('.sectionRow').css('display', 'inherit').attr('index', '0').end().insertBefore("#buttonGroup");
        }

        else if ($(this).text() == 'Work Experience') {
            if ($("form").find('#workSection').length == 0)
                $(sections.workSection).css("display", "inherit").find('.sectionRow').css('display', 'inherit').attr('index', '0').end().insertBefore("#buttonGroup");
        }
        else if ($(this).text() == 'Research Papers') {
            if ($("form").find('#researchSection').length == 0)
                $(sections.researchSection).css("display", "inherit").find('.sectionRow').css('display', 'inherit').attr('index', '0').end().insertBefore("#buttonGroup");
        }
    });


    // Click handler on the DeleteSection Button
    $("#deleteSection").on('click', function (e) {
        if ($(this).parent().parent().prev().hasClass('undeleteable')) {
            console.log("Sorry, you can't delete any row beyond this point.");
        }
        else
            $(this).parent().parent().prev().remove();
    });


    // On click handler on AddRowButtons and will add a new [.sectionRow] to the parent [.section]
    $("#formDiv").on('click', '.addRowButton', function () {
        closestSectionRow = $(this).closest('.sectionRow');
        index = $(closestSectionRow).attr('index');

        var clone = $(sections[(closestSectionRow.attr('class').split(' '))[0]]).clone().attr('index', parseInt(index) + 1).css({ "display": "inherit" });

        $(clone).find('.btn-primary').attr('disabled', false).end().appendTo($(closestSectionRow).closest('.section'));
        $(this).prop('disabled', true);
    });

    // On click handler on DeleteRowButtons and will delete an existing [.sectionRow] from the parent [.section]
    // If there exists only one last [.sectionRow] then the entire [.section] is removed
    $("#formDiv").on('click', '.deleteRowButton', function () {
        closestSectionRow = $(this).closest('.sectionRow');
        allSiblingSectionRows = $(closestSectionRow).siblings('.sectionRow');
        length = allSiblingSectionRows.length + 1;                                      // +1 the element itself : length is the total number of sectionRows inside a Section
        var index = parseInt(closestSectionRow.attr('index'));
        if (length == 1) {
            closestSectionRow.closest('.section').remove();                             //Remove the entire section
        }
        if (parseInt(closestSectionRow.attr('index')) == length - 1) {

            $(allSiblingSectionRows[length - 2]).find('.btn-danger').attr('disabled', false);
            $(allSiblingSectionRows[length - 2]).find('.btn-primary').attr('disabled', false);
            closestSectionRow.remove();
        }
        else
            closestSectionRow.remove();
        $(allSiblingSectionRows).each(function (n) {
            $(this).attr('index', n);
        });

    });


    // Submits the data on the server. All the json data is created using string manipulation.
    $("#updateAccountButton").on('click', function () {
        var user = "";
        var List_Education = "", List_WorkExperience = "", List_ResearchContribution = "";
        $('.mandatory').find('input').each(function () {
            user += (user == "" ? "" : ",") + '"' + $(this).attr('name') + '":"' + $(this).val() + '"';
        });
        user += ',';
        console.log(user + "\n");
        if ($('form #educationSection, #workSection, #researchSection').length != 0) {
            $('form #educationSection .sectionRow').each(function () {
                var education = '';
                $(this).find('input').each(function () {
                    education += education == '' ? '' : ',';
                    education += '"' + [$(this).attr('name')] + '":"' + $(this).val() + '"';
                });
                List_Education += (List_Education == "" ? "" : ",") + '{' + (education) + '}';
            });
            $('form #workSection .sectionRow').each(function () {
                var experience = '';
                $(this).find('input').each(function () {
                    experience += experience == '' ? '' : ',';
                    experience += '"' + [$(this).attr('name')] + '":"' + $(this).val() + '"';
                });
                List_WorkExperience += (List_WorkExperience == "" ? "" : ",") + '{' + (experience) + '}';
            });
            $('form #researchSection .sectionRow').each(function () {
                var research = '';
                $(this).find('input').each(function () {
                    research += research == '' ? '' : ',';
                    research += '"' + [$(this).attr('name')] + '":"' + $(this).val() + '"';
                });
                List_ResearchContribution += (List_ResearchContribution == "" ? "" : ",") + '{' + (research) + '}';
            });
        }
        else {
            // Don't add anything to EducationData or WorkExperience or ResearchContribution. These Sections don't exist at all.
        }
        user += '"List_Education":[' + (List_Education) + '],';
        user += '"List_WorkExperience":[' + List_WorkExperience + '],';
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