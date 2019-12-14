$(function(){
    // $(".custom-navbar").load("navbar.html");

// (function () {
//     $(document).ready(function () {
        console.log('navbar');
    //
    // function addDietFilterTemplate(diet) {
    //     console.log(diet.type);
    //     var radioDiet = '<div class="radio radio-diet">' +
    //         '<label><input type="radio" name="' + diet.type + '">' + diet.type +'</label></div>';
    //     $('.filter-diet').append(radioDiet);
    // }
    //
    // $.ajax({
    //     method: "GET",
    //     url: "/api/diet/getDiets"
    // })
    //     .done(function (response) {
    //         console.log(response);
    //         $.each(response, function (i, diet) {
    //             addDietFilterTemplate(diet);
    //         });
    //         // if(!response){
    //         //     window.location = "index.html";
    //         //     return;
    //         // }
    //     });
    //
    // function addCuisineFilterTemplate(cuisine) {
    //     // console.log(diet.type);
    //     var radioCuisine = '<div class="radio radio-cuisine">' +
    //         '<label><input type="radio" name="' + cuisine.type + '">' + cuisine.type +'</label></div>';
    //     $('.filter-cuisine').append(radioCuisine);
    // }
    //
    // $.ajax({
    //     method: "GET",
    //     url: "/api/cuisine/getCuisines"
    // })
    //     .done(function (response) {
    //         console.log(response);
    //         $.each(response, function (i, cuisine) {
    //             addCuisineFilterTemplate(cuisine);
    //         });
    //         // if(!response){
    //         //     window.location = "index.html";
    //         //     return;
    //         // }
    //     });

    var allDiets;
    var allCuisines;
    $.ajax({
        method: "GET",
        url: "/api/diet/getDiets"
    })
        .done(function (response) {
            allDiets = response;
            console.log(response);
            $.each(response, function (i, diet) {
                $('.filter-diet').append($('<option>', {
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
            allCuisines = response;
            console.log(response);
            $.each(response, function (i, cuisine) {
                $('.filter-cuisine').append($('<option>', {
                    value: cuisine.type,
                    text : cuisine.type
                }));
            });
            // if(!response){
            //     window.location = "index.html";
            //     return;
            // }
        });

    function addCardRecipeTemplate(id, title, preptime, description, cover) {
        console.log('recipe card');
        var recipeCard = $('.recipe-card:first').clone();

        recipeCard.attr('id', id);
        recipeCard.find('img').attr('src', cover);
        recipeCard.find('.card-title').html(title);
        recipeCard.find('.card-text').html(description.substr(0, 100) + '...');
        recipeCard.find('a').attr('href', '/recipe/' + id);

        // if (me == userId) {
        //     miniMe.find('button').click(function() {
        //
        //         deleteComment(miniMe, id);
        //
        //     });
        // } else {
        //     miniMe.find('button').hide();
        // }

        // console.log(recipeCard);
        recipeCard.show();

        $('.recipe-row').append(recipeCard);
    }

    function getAllRecipes(){
        $.ajax({
            method: "GET",
            url: "/api/recipe/getRecipes"
        })
            .done(function(response) {
                console.log(response);
                response.forEach(function(recipe) {
                    console.log(recipe);
                    addCardRecipeTemplate(
                        recipe.id,
                        recipe.title,
                        recipe.preptime,
                        recipe.description,
                        // recipe.user.username,
                        recipe.cover
                    );
                });

                // if(!response){
                //     window.location = "index.html";
                //     return;
                // }
            });
    }

    getAllRecipes();

    function removeCardRecipesFromDom(){
        $('.recipe-card:not(:first)').remove();
    }

    $('#filter-add-button').click(function(){
        // console.log($('.filter-diet').val());
        console.log($('.filter-cuisine').val());
        console.log($('.filter-view').val());
        console.log(allCuisines);
        var cuisineId;
        allCuisines.forEach(function (cuisine) {
            if(cuisine.type.toLowerCase() === $('.filter-cuisine').val().toLowerCase()){
                cuisineId = cuisine.id;
            }
        });
        console.log(cuisineId);
        console.log(allCuisines);
        $.ajax({
            method: "GET",
            url: "/api/recipe/filter",
            data: {
                cuisineId: cuisineId
            }
        })
            .done(function(response) {
                console.log(response);
                removeCardRecipesFromDom();
                response.forEach(function(recipe) {
                    console.log(recipe);
                    addCardRecipeTemplate(
                        recipe.id,
                        recipe.title,
                        recipe.preptime,
                        recipe.description,
                        // recipe.user.username,
                        recipe.cover
                    );
                });

                // if(!response){
                //     window.location = "index.html";
                //     return;
                // }
            });
    })

    // });
});