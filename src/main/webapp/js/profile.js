$(function () {
    var emailField = $("#profile-email");
    var usernameField = $("#profile-username");
    var passwordField = $('#profile-password');
    var repeatPasswordField = $('#profile-repeat-password');

    /** Getting user profile */
    $.ajax({
        method: "GET",
        url: "/api/profile/getUserProfile"
    })
        .done(function (response) {
            console.log(response);
            /** if no user is logged in send them to the index page */
            if (!response) {
                window.location = "/";
                return;
            }
            /** if user has been successfully logged in prefill username and email fields */
            emailField.val(response.email);
            usernameField.val(response.username)
        });

    function emptyFieldValidation(field, formSubmitted){
        var helpField = field.next();

        /** check if form is submitted, if it is not adds additional check if all fields are filled */
        if(formSubmitted === true) {
            if (field.val() === '') {
                field.addClass('border border-danger');
                helpField.text('This field is required.').addClass('text-danger');
            }
        }

        /** checks if field is empty when it gets out of focus and adds danger classes if not filled */
        field.focusout(function(){
            if(!field.val()) {
                $(this).addClass('border border-danger');
                helpField.text('This field is required.').addClass('text-danger');
            }
        });

        /** removing danger classes when input is being clicked on */
        field.focusin(function () {
            $(this).removeClass('border border-danger');
            helpField.text('').removeClass('text-danger');
        })
    }

    /**
     * Function for checking if email address is valid
     * @param field - email field to be checked
     */
    function emailValidation(field){
        field.focusout(function() {
            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(field.val())) {
                field.addClass('border border-danger');
                var helpField = field.next();
                helpField.text('You have entered an invalid email address!').addClass('text-danger');
            }
        });
    }

    /**
     * Input validations
     * @param formSubmitted - checks if form is submitted
     */
    function profileFormValidation(formSubmitted){
        emptyFieldValidation(emailField, formSubmitted);
        emptyFieldValidation(usernameField, formSubmitted);
        emptyFieldValidation(passwordField, formSubmitted);
        emptyFieldValidation(repeatPasswordField, formSubmitted);
        emailValidation(emailField);

        // frontend check if passwords match - to be added
    }

    profileFormValidation(false);

    $('#profile-update').click(function () {
        console.log(usernameField.val());
        console.log(emailField.val());
        console.log(passwordField.val());
        console.log(repeatPasswordField.val());
        profileFormValidation(true);
        if(emailField.val() !== '' &&
            usernameField.val() !== '' &&
            passwordField.val() !== '' &&
            repeatPasswordField.val() !== ''
        ) {
            $.ajax({
                url: '/api/profile/update',
                method: "POST",
                data:
                    {
                        username: usernameField.val(),
                        email: emailField.val(),
                        password: passwordField.val(),
                        rePassword: repeatPasswordField.val()
                    },
                complete: function (response) {
                    console.log(response);
                    switch(response.status){
                        case 200:
                            alert('Profile has been successfully updated');
                            passwordField.val('');
                            repeatPasswordField.val('');
                            break;
                        case 400:
                            alert('Username or email is used by another user. Please try again with something different.');
                            passwordField.val('');
                            repeatPasswordField.val('');
                            break;
                        default:
                            alert("Some error occurred while uploading your profile. Please try again");
                            passwordField.val('');
                            repeatPasswordField.val('');
                            break;
                    }
                }
            })
        }

    });
});