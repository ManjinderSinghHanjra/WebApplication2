var strHostName = "DemoProject";
$(document).ready(function () {


	// Date Picker
	$("#dob").datepicker({
		onSelect: function () {
			$(this).data('datepicker').inline = true;
		},
		onClose: function () {
			$(this).data('datepicker').inline = false;
		},
		changeMonth: true,
		changeYear: true,
		dateFormat: 'dd MM yy',
		yearRange: '1910:+nn',
		minDate: '-107Y',
		maxDate: '-9Y +93D',
		showOptions: {
			direction: 'up'
		}
	});


	$("#backButton").on('click', function () {
		window.location.href = "/" + strHostName + "/Login";
	});


	$("#signUpSubmit").on('click', function (e) {
		e.preventDefault();
		var json = JSON.stringify( { "Name": $("#firstName").val(), "Dob": $("#dob").val(), "EmailID": $("#email").val(), "Password": $("#password").val() } );
		$.ajax({
			url: "/" + strHostName + "/Login/SignUpSubmitDetails",
			type: "POST",
			contentType: "application/json; charset=utf-8",
			data: json,
			cache: false,
			async: true,
			success: function (reply) {
				alert("Data sent successfully! \n" + JSON.stringify(reply));
				console.log(reply.Name);
			},
			error: function () {
				alert("Error Occured.");
			}
		});
	});



	// Form validations
	jQuery.validator.addMethod("customNameValidator",
		function (value, element) { return /^[a-zA-Z]+$/.test(value); }, "Only alphabets are allowed.");

	jQuery.validator.addMethod("customEmailValidator",
		function (value, element) { return /^[a-zA-Z0-9\d\@._]+$/.test(value); }, 'No special characters are allowed except @(at) .(dot) and _(underscore)');

	jQuery.validator.addMethod("customPasswordValidator",
		function (value, element) { return /^[A-Za-z0-9\d]+$/.test(value); }, "No special characters are allowed except @(at) .(dot) and _(underscore)");


	$("#signupForm").validate({
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
				customNameValidator: true
			},
			email: {
				required: true,
				minlength: 3,
				maxlenght: 32,
				customEmailValidator: true
			},
			password: {
				required: true,
				minlength: 3,
				maxlength: 32,
				customPasswordValidator: true
			},
			confirmPassword: {
				equalTo: "#password"
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
			email: {
				required: "email can't be empty",
				minlength: "At least 3 email characters.",
				maxlength: "At most 30 email characters.",

			},
			password: {
				required: "password can't be empty",
				minlength: "At least 4 password characters",
				maxlength: "At most 32 password characters"
			},
			confirmPassword: {

			}
		},

		// By default the Validation Error appears just below the input box,
		// but this was not the case here, so I needed to find a way around
		errorPlacement: function (error, element) {
			if (element.attr("name") == "email") {
				var br = document.createElement("br");
				error.appendTo(document.getElementById("emailFormGroup"));
			}
			else {
				error.insertAfter(element);
			}
		}
	});


});