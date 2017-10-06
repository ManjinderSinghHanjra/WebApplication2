var strHostName = "DemoProject";
$(document).ready(function () {

	jQuery.validator.addMethod("customNameValidator",
		function (value, element) { return /^[a-zA-Z]+$/.test(value); }, "Only alphabets are allowed.");

	jQuery.validator.addMethod("customEmailValidator",
		function (value, element) { return /^[a-zA-Z0-9\d\@._]+$/.test(value); }, 'No special characters are allowed except @(at) .(dot) and _(underscore)');

	jQuery.validator.addMethod("customPasswordValidator",
		function (value, element) { return /^[A-Za-z0-9\d]+$/.test(value); }, "No special characters are allowed except @(at) .(dot) and _(underscore)");

	$("#ContinueButton").on('click', function () {
		var remodal = $('[data-remodal-id=modal]').remodal();
		remodal.open();
	});


	$("#signIn").on('click', function () {

		if ($("#loginForm").valid()) {
			var email = $("#email").val();
			var pass = $("#password").val();
			if (email === 'admin' && pass === 'admin') {
			    $("#failure").css("display", "none");
			    $.ajax({
			        type: "POST",
			        url: "login/LoginCheck",
			        contentType: "application/x-www-form-urlencoded; charset=utf-8",
			        cache: false,
			        success: function(result){ alert("Query worked");}
			    });
				//window.location.href = "/" + strHostName + "/Home/Index";// @Url.Action("Index", "Home"); 
			}
			else {
				$("#failure").css({ 'display': 'inline', 'color': '#ff0000' });
			}
		}
	});

	$("#signup").on('click', function () {
		if($("#signupForm").valid())
		{
			// Todo: Send the signup form data to the Model, then redirect the user to the login page.
		}
	});


	$("#loginForm").validate({
		rules: {
			email: {
				required: true,
				minlength: 3,
				maxlength: 30,
				customEmailValidator: true
			},
			password: {
				required: true,
				minlength: 4,
				maxlength: 32,
				customPasswordValidator: true
			}
		},
		message: {
			email: {
				required: "email can't be empty",
				minlength: "At least 3 email characters.",
				maxlength: "At most 30 email characters."

			},
			password: {
				required: "password can't be empty",
				minlength: "At least 4 password characters",
				maxlength: "At most 32 password characters"
			}
		},

		errorPlacement: function (error, element) {
			error.className = 'error'; 		//for styling
			if (element.attr("name") == "email") {
				var br = document.createElement("br");
				error.appendTo(document.getElementById("emailFormGroup"));
			} else {
				error.insertAfter(element); // this is the default behaviour
			}
		}
	});

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
				maxlength: 30,
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