(function () {
    console.log('test');
    /** check if registration form exists */
    if($('#register-form').length > 0){
        let emailField = $('#register-email');
        let usernameField = $('#register-username');
        let passwordField = $('#register-password');
        let repeatPasswordField = $('#register-repeat-password');

        /**
         * Function for validation if fields are empty or not
         * @param field - field to be checked if empty
         * @param formSubmitted - checks if form is submitted, if it is adds additional check if fields are not empty
         */
        function emptyFieldValidation(field, formSubmitted){
            var helpField = field.next();

            /** check if form is submitted, if it is not adds additional check if all fields are filled */
            if(formSubmitted === true) {
                if (field.val() === '') {
                    field.addClass('border border-danger');
                    helpField.text('This field is required.').addClass('text-danger');
                    //     var helpField = field.next();
                    //     helpField.text('Email field is required.').addClass('text-danger');
                    //     field.focusin(function(){
                    //         console.log('focus');
                    //         helpField.text('').removeClass('text-danger');
                    //     });
                    //     ifFocusOff(field);
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
        function registerFormValidation(formSubmitted){
            emptyFieldValidation(emailField, formSubmitted);
            emptyFieldValidation(usernameField, formSubmitted);
            emptyFieldValidation(passwordField, formSubmitted);
            emptyFieldValidation(repeatPasswordField, formSubmitted);
            emailValidation(emailField);

            // frontend check if passwords match - to be added
        }

        /** Cleaning password fields value when error occurs */
        function cleanPasswordFields(){
            passwordField.val('');
            repeatPasswordField.val('');
        }

        /** Cleaning all fields in case something messes up a lot */
        function cleanAllFields(){
            emailField.val('');
            usernameField.val('');
            cleanPasswordFields();
        }

        function submitRegisterForm(){
            registerFormValidation(true);

            /** send request only if all fields are not empty */
            if(emailField.val() !== '' &&
                usernameField.val() !== '' &&
                passwordField.val() !== '' &&
                repeatPasswordField.val() !== ''
            ){
                $.ajax({
                    url: "/api/register",
                    method: "POST",
                    data: {
                        email: emailField.val(),
                        username: usernameField.val(),
                        password: passwordField.val(),
                        repeatPassword: repeatPasswordField.val()
                    },
                    success: function (data) {
                        console.log(data);
                        /** if success redirect to login page */
                        if(data === 'success'){
                            alert('Registration successful. Please log in.');
                            $('#registerModal').modal('hide');
                            $('#loginModal').modal('show');
                            // window.location.href = "/profile";
                        } else if(data === 'error') { /** on error show alert and clear all fields */
                        alert('Something messed up, please try again.');
                            cleanAllFields();
                        } else {
                            /** stupid temporary solution for field validation */
                            if(data.toLowerCase().includes('email')){
                                emailField.addClass('border border-danger');
                                emailField.next().text(data).addClass('text-danger');
                                cleanPasswordFields();
                            }
                            if(data.toLowerCase().includes('username')){
                                usernameField.addClass('border border-danger');
                                usernameField.next().text(data).addClass('text-danger');
                                cleanPasswordFields();
                            }
                            if(data.toLowerCase().includes('password')){
                                passwordField.addClass('border border-danger');
                                passwordField.next().text(data).addClass('text-danger');
                                repeatPasswordField.addClass('border border-danger');
                                repeatPasswordField.next().text(data).addClass('text-danger');
                                cleanPasswordFields();
                            }
                        }
                        // window.location.replace(data);
                    },
                    fail: function () {
                        console.log('error')
                        // window.location.href = "error.html";
                    }
                });
            }
        }

        registerFormValidation(false);

        /** submitting register form when submit button is clicked */
        $('#confirm-register').click(function (e) {
            console.log('test');
            e.preventDefault();
            submitRegisterForm();
        });

        /** form submit when enter button is pressed inside repeat password input */
        repeatPasswordField.on('keypress',function(e) {
            if(e.which === 13) {
                submitRegisterForm();
            }
        });
    }

    /** ---------------- LOGIN -------------------------*/

    /** login section because for some reason login.js is not working */
    if($('#login-form').length > 0){
        var loginUsernameField = $('#login-username');
        var loginPasswordField = $('#login-password');

        /** Validation on empty fields */
        function loginFormValidation(formSubmitted){
            emptyFieldValidation(loginUsernameField, formSubmitted);
            emptyFieldValidation(loginPasswordField, formSubmitted);

            // frontend check if passwords match - to be added
        }

        function actOnError(){
            alert("Login unsuccessful. Please try again.");
            loginUsernameField.val('');
            loginPasswordField.val('');
        }

        /** Login submit function */
        function submitLoginForm(){
            loginFormValidation(true);

            /** send request only if all fields are not empty */
            if(loginUsernameField.val() !== '' &&
                loginPasswordField.val() !== ''
            ){
                $.ajax({
                    url: "/api/login",
                    method: "POST",
                    data: {
                        username: loginUsernameField.val(),
                        password: loginPasswordField.val(),
                    },
                    success: function (data) {
                        console.log(data);
                        /** if success redirect to profile page */
                        if(data === 'success'){
                            console.log('successful registration');
                            window.location.href = "/profile";
                        } else {
                            alert(data);
                            loginUsernameField.val('');
                            loginPasswordField.val('');
                        }
                        // window.location.replace(data);
                    },
                    fail: function () {
                        actOnError();
                        // window.location.href = "error.html";
                    }
                });
            }
        }

        /** form validation before form submit */
        loginFormValidation(false);

        /** form submit when button submit is being clicked */
        $('#confirm-login').click(function (e) {
            console.log('submit');
            e.preventDefault();
            submitLoginForm();
        });

        /** form submit when enter button is pressed inside password input */
        loginPasswordField.on('keypress',function(e) {
            if(e.which === 13) {
                submitLoginForm();
            }
        });

    }
})();

