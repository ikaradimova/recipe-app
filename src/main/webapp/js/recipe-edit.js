$(function(){
    // $(".custom-navbar").load("navbar.html");

// (function () {
//     $(document).ready(function ()

    var recipeEditTitleField = $("#recipe-title-edit");
    var recipeEditPreptimeField = $("#recipe-preptime-edit");
    var recipeEditDescriptionField = $("#recipe-description-edit");
    var recipeEditIngredientsField = $("#recipe-ingredients-edit");
    var recipeEditPreparationField = $("#recipe-preparation-edit");
    var recipeEditCoverField = $("#recipe-cover-edit");
    var recipeEditDietField = $("#recipe-diet-edit");
    var recipeEditCuisineField = $("#recipe-cuisine-edit");
    var recipeEditButton = $("#recipe-edit-button");

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
                $("#recipe-diet-edit").append($('<option>', {
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
                $("#recipe-cuisine-edit").append($('<option>', {
                    value: cuisine.type,
                    text : cuisine.type
                }));
            });
            // if(!response){
            //     window.location = "index.html";
            //     return;
            // }
        });

    var path = window.location.pathname;
    var pathParts = path.split('/');
    if(pathParts.length < 4){
        window.location = "/";
    } else {
        var id = pathParts[3];
        console.log(pathParts);

        // function getRecipe(){
        $.ajax({
            method: "GET",
            url: "/api/recipe/" + id,
            data: {
                id: id
            }
        })
            .done(function(response) {
                console.log(response);


                $("#recipe-title-edit").val(response.title);
                $("#recipe-preptime-edit").val(response.preptime);
                $("#recipe-description-edit").html(response.description);
                // $(".recipe-ingredients").html(response.ingredients);
                $("#recipe-preparation-edit").html(response.preparation);
                $("#recipe-ingredients-edit").html(response.ingredients);

                $("#recipe-cuisine-edit").val(response.cuisine.type);
                $("#recipe-diet-edit").val(response.diets[0].type);

                // var allDiets = '';
                // response.diets.forEach(function(diet){
                //     allDiets += diet.type + ' ';
                // });
                //
                // $(".recipe-diet").html(allDiets);

                // var ingredients = response.ingredients.split(',');
                // ingredients.forEach(function(ingredient){
                //     if(ingredient !== ''){
                //         $(".recipe-ingredients").append($('<li>', {
                //             value: ingredient,
                //             text : ingredient
                //         }));
                //     }
                // })
                // console.log(ingredients);


                // if(!response){
                //     window.location = "index.html";
                //     return;
                // }
            });
        // }

        // getRecipe();
    }

    $("#recipe-edit-form").on('submit', function (e) {
        console.log('submit');
        e.preventDefault();
        // recipeFormValidation(true);

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

        // console.log(recipeAddCoverField[0].files);

        var formData = new FormData();
        formData.append('id', id);
        formData.append('title', recipeEditTitleField.val());
        formData.append('preptime', recipeEditPreptimeField.val());
        formData.append('description', recipeEditDescriptionField.val());
        formData.append('ingredients', recipeEditIngredientsField.val());
        formData.append('preparation', recipeEditPreparationField.val());
        formData.append('dietType', recipeEditDietField.val());
        formData.append('cuisineType', recipeEditCuisineField.val());

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
            url: "/api/recipe/edit/" + id,
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


    // });
});