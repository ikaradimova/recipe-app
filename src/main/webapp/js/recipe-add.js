// (function () {
$(document).ready(function () {
    console.log(window.location.href);
    var path = window.location.pathname;
    var pathParts = path.split('/');
    console.log(pathParts);
    console.log('recipe');
    /** check if cuisine form exists */

    if ($('#recipe-add-form').length > 0) {
        var recipeAddTitleField = $("#recipe-title-add");
        var recipeAddPreptimeField = $("#recipe-preptime-add");
        var recipeAddDescriptionField = $("#recipe-description-add");
        var recipeAddIngredientsField = $("#recipe-ingredients-add");
        var recipeAddPreparationField = $("#recipe-preparation-add");
        var recipeAddCoverField = $("#recipe-cover-add");
        var recipeAddDietField = $("#recipe-diet-add");
        var recipeAddCuisineField = $("#recipe-cuisine-add");
        var recipeAddButton = $("#recipe-add-button");

        $.ajax({
            method: "GET",
            url: "/api/profile/getUserProfile"
        })
            .done(function(response) {
                console.log(response);
                if(!response){
                    window.location = "/";
                    // return;
                }
            });

        $.ajax({
            method: "GET",
            url: "/api/diet/getDiets"
        })
            .done(function (response) {
                console.log(response);
                $.each(response, function (i, diet) {
                    recipeAddDietField.append($('<option>', {
                        value: diet.type,
                        text : diet.type
                    }));
                });
                // if(!response){
                //     window.location = "index.html";
                //     return;
                // }
            });
        $.ajax({
            method: "GET",
            url: "/api/cuisine/getCuisines"
        })
            .done(function (response) {
                console.log(response);
                $.each(response, function (i, cuisine) {
                    recipeAddCuisineField.append($('<option>', {
                        value: cuisine.type,
                        text : cuisine.type
                    }));
                });
                // if(!response){
                //     window.location = "index.html";
                //     return;
                // }
            });

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
         * Input validations
         * @param formSubmitted - checks if form is submitted
         */
        function recipeFormValidation(formSubmitted){
            emptyFieldValidation(recipeAddTitleField, formSubmitted);
            emptyFieldValidation(recipeAddPreptimeField, formSubmitted);
            emptyFieldValidation(recipeAddDescriptionField, formSubmitted);
            emptyFieldValidation(recipeAddIngredientsField, formSubmitted);
            emptyFieldValidation(recipeAddPreparationField, formSubmitted);
            emptyFieldValidation(recipeAddCoverField, formSubmitted);

        }

        recipeFormValidation(false);

        // console.log('form exists');
        // let cuisineField = $('#cuisine-add');
        // let cuisineButton = $('#cuisine-add-button');
        //
        $("#recipe-add-form").on('submit', function (e) {
            console.log('submit');
            e.preventDefault();
            recipeFormValidation(true);

            // var data = {
            //     title: recipeAddTitleField.val(),
            //     preptime: recipeAddPreptimeField.val(),
            //     description: recipeAddDescriptionField.val(),
            //     ingredients: recipeAddIngredientsField.val(),
            //     preparation: recipeAddPreparationField.val(),
            //     cover: recipeAddCoverField.files[0],//new FormData(this),
            //     // createdAt: Date.now(),
            //     dietType: recipeAddDietField.val(),
            //     cuisineType: recipeAddCuisineField.val()
            // };

            console.log(recipeAddCoverField[0].files);

            var formData = new FormData();
            formData.append('title', recipeAddTitleField.val());
            formData.append('preptime', recipeAddPreptimeField.val());
            formData.append('description', recipeAddDescriptionField.val());
            formData.append('ingredients', recipeAddIngredientsField.val());
            formData.append('preparation', recipeAddPreparationField.val());
            formData.append('cover', recipeAddCoverField[0].files[0]);
            formData.append('dietType', recipeAddDietField.val());
            formData.append('cuisineType', recipeAddCuisineField.val());

            // console.log(data);
            // console.log(new FormData(this));

            /** send request only if all fields are not empty */
            // if(
            //     recipeAddTitleField.val() !== '' &&
            //     recipeAddPreptimeField.val() !== '' &&
            //     recipeAddDescriptionField.val() !== '' &&
            //     recipeAddIngredientsField.val() !== '' &&
            //     recipeAddPreparationField.val() !== ''
            // ){
                $.ajax({
                    url: "/api/recipe/add",
                    method: "POST",
                    data: formData,
                    processData: false,
                    // dataType: 'json',
                    contentType: false,
                    enctype: 'multipart/form-data',
                    // contentType: "application/json; charset=UTF-8",
                    // done: function (data) {
                    //     console.log(data);
                    //     // if(data === 'success'){
                    //     //     console.log('recipe successfully added');
                    //     //     // window.location.href = "profile.html";
                    //     // } else {
                    //     //     console.log('error while adding recipe')
                    //     // }
                    //     // window.location.replace(data);
                    // },
                    complete: function(data){
                        if(!data){
                            window.location = "/";
                            return;
                        }
                        switch(data.status){
                            case 200:


                                break;
                            case 401:
                                window.location.href = "/";
                                break;

                        }
                    },
                    fail: function (jqXHR, textStatus, errorThrown) {
                        console.log(jqXHR);
                        console.log(textStatus);
                        console.log(errorThrown);
                        console.log('error');
                        // window.location.href = "error.html";
                    }
                });
            // }
        });

    }

});