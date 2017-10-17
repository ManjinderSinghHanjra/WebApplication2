var strHostName = "DemoProject";

$(document).ready( function(){

    $("#modifyForm").validate({
		rules: {
			firstName: {
				required: true,
				minlength: 3,
				maxlength: 32,
				customNameValidator: true
			},
			lastName: {
				minlength: 3,
				maxlength: 32,
				customName2Validator: true
			},
			password: {
				required: true,
				minlength: 3,
				maxlength: 32,
				customPasswordValidator: true
			}
		},
		message: {
			firstName: {
				required: "email can't be empty",
				minlength: "At least 3 email characters.",
				maxlength: "At most 30 email characters.",
			},
			lastName: {
				minlength: "At least 3 email characters.",
				maxlength: "At most 30 email characters.",
			},
			password: {
				required: "password can't be empty",
				minlength: "At least 4 password characters",
				maxlength: "At most 32 password characters"
			}
		}
    });


    jQuery.validator.addMethod("customNameValidator",
		function (value, element) { return /^[a-zA-Z]+$/.test(value); }, "Only alphabets are allowed.");
    jQuery.validator.addMethod("customName2Validator",
		function (value, element) { return /^[a-zA-Z\s]+$/.test(value); }, "Only alphabets are allowed.");

    jQuery.validator.addMethod("customEmailValidator",
		function (value, element) { return /^[a-zA-Z0-9\d\@._]+$/.test(value); }, 'No special characters are allowed except @(at) .(dot) and _(underscore)');

    jQuery.validator.addMethod("customPasswordValidator",
		function (value, element) { return /^[A-Za-z0-9\d]+$/.test(value); }, "No special characters are allowed except @(at) .(dot) and _(underscore)");



    $("#buttonUpdateRecords").on('click', function (e) {
        $("#modifyForm").valid();
	    e.preventDefault();
	    var json = '{"oUpdateUserModel":{"Name": "' + $("#firstName").val() + '", "Dob":  "' + $("#dob").val() + '", "EmailID":  "' + $("#email").val() + '", "Password":  "' + $("#password").val() + '"}}';
		$.ajax({
		    url: "/" + strHostName + "/Home/UpdateUserCommit",
			type: "POST",
			contentType: "application/json; charset=utf-8",
			data: json,
			async: true,
			cache: false,
			success: function (reply) {
				alert(reply);
			},
			error: function (reply) {
				alert(reply);
			}
		});

	});

});