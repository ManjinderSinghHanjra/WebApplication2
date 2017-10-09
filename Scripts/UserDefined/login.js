var strHostName = "DemoProject";
$(document).ready(function () {

    jQuery.validator.addMethod("customNameValidator",
        function (value, element) { return /^[a-zA-Z]+$/.test(value); }, "Only alphabets are allowed.");

    jQuery.validator.addMethod("customEmailValidator",
        function (value, element) { return /^[a-zA-Z0-9\d\@._]+$/.test(value); }, 'No special characters are allowed except @(at) .(dot) and _(underscore)');

    jQuery.validator.addMethod("customPasswordValidator",
        function (value, element) { return /^[A-Za-z0-9\d]+$/.test(value); }, "No special characters are allowed except @(at) .(dot) and _(underscore)");


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



    $("#ContinueButton").on('click', function () {
        var remodal = $('[data-remodal-id=modal]').remodal();
        remodal.open();
    });


    $("#signIn").on('click', function (e) {
        
        if ($("#loginForm").valid()) {
            var email = $("#emailID").val();
            var pass = $("#password").val();
            var json = "{'email': email, 'password': pass}";
            $.ajax({
                    url: "/" + strHostName + "/Login",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    data: json,
                    cache: false,
                    async: true,
                    success: function(reply) {
                        alert(JSON.stringify(reply));
                    },
                    error: function (reply) {
                        alert(JSON.stringify(reply));
                    }
                });
                // @Url.Action("Index", "Home"); 

            /*
            $("#failure").css("display", "none");
            else {
                $("#failure").css({ 'display': 'inline', 'color': '#ff0000' });*/
        }
    });

    $("#signUp").on('click', function () {
        window.location.href = "/" + strHostName + "/Login/SignUp";
    });


    

});