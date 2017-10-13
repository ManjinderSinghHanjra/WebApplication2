var strHostName = "DemoProject";

function fillUpTheForm(reply)
{
	$("#firstName").html = reply.Name;
	$("#lastName").html = reply.Name;
	$("#dob").html = reply.Dob;
	$("#email").html = reply.Email;
	$("#password").html = reply.Password;
}

$(document).ready( function(){


	$("buttonUpdateRecords").on('click', function () {
	    var json = '{"user":{"Name": "firstName", "Dob": "dob", "EmailID": "email", "Password":"password"}}';
	    $.ajax({
			url: "/" + strHostName + "/Home/ModifyRecord3",
			type: "POST",
			contentType: "application/json; charset=utf-8",
			data: json,
			async: true,
			cache: false,
			success: function (reply) {
				alert(reply.responseText());
			},
			error: function (reply) {
			    alert(reply.responseText());
			}
		});
	});




	jQuery.validator.addMethod("customNameValidator",
		function (value, element) { return /^[a-zA-Z]+$/.test(value); }, "Only alphabets are allowed.");
	jQuery.validator.addMethod("customName2Validator",
		function (value, element) { return /^[a-zA-Z\s]+$/.test(value); }, "Only alphabets are allowed.");

	jQuery.validator.addMethod("customEmailValidator",
		function (value, element) { return /^[a-zA-Z0-9\d\@._]+$/.test(value); }, 'No special characters are allowed except @(at) .(dot) and _(underscore)');

	jQuery.validator.addMethod("customPasswordValidator",
		function (value, element) { return /^[A-Za-z0-9\d]+$/.test(value); }, "No special characters are allowed except @(at) .(dot) and _(underscore)");


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
		},
	});
});