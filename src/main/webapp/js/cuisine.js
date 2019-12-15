// console.log('gdgdfgfdgfdgdfgfgdd');
// (function () {
$(document).ready(function () {
    console.log('cuisine');
    /** check if cuisine form exists */

    if($('.cuisine-add-form').length > 0){

        function emptyFieldValidation(field, formSubmitted) {
            var helpField = field.next();

            /** check if form is submitted, if it is not adds additional check if all fields are filled */
            if (formSubmitted === true) {
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
            field.focusout(function () {
                if (!field.val()) {
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

        $.ajax({
            method: "GET",
            url: "/api/profile/getUserProfile"
        })
            .done(function(response) {
                console.log(response);
                if(!response || response.role.name === 'user'){
                    window.location = "/";
                    return;
                }
            });

        console.log('form exists');
        let cuisineField = $('#cuisine-add');
        let cuisineButton = $('#cuisine-add-button');

        emptyFieldValidation(cuisineField, false);

        cuisineButton.click(function (e) {
            console.log(cuisineField.val());
            console.log('submit');
            // e.preventDefault();
            emptyFieldValidation(cuisineField, true);

            /** send request only if all fields are not empty */
            if(cuisineField.val() !== ''){
                $.ajax({
                    url: "/api/cuisine/add",
                    method: "POST",
                    data: {
                        type: cuisineField.val(),
                    },
                    success: function (data) {
                        console.log(data);
                        if(data.id){
                            alert('Cuisine successfully added!');
                            location.reload();
                        } else {
                            alert(data);
                            location.reload();
                        }
                        // window.location.replace(data);
                    },
                    fail: function () {
                        console.log('error')
                        // window.location.href = "error.html";
                    }
                });
            }
        });

    }

});