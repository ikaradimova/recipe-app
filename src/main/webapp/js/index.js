$(function () {
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
                    text: diet.type
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
                    text: cuisine.type
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
        recipeCard.show();

        $('.recipe-row').append(recipeCard);
    }

    function addListRecipeTemplate(id, title, preptime, description, cover) {
        console.log('recipe card');
        var recipeList = $('.recipe-list:first').clone();

        recipeList.attr('id', id);
        recipeList.find('img').attr('src', cover);
        recipeList.find('.list-title').html(title);
        recipeList.find('.list-text').html(description.substr(0, 100) + '...');
        recipeList.find('a').attr('href', '/recipe/' + id);
        recipeList.show();

        $('.recipe-list-group').append(recipeList);
    }

    function getAllRecipes() {
        $.ajax({
            method: "GET",
            url: "/api/recipe/getRecipes"
        })
            .done(function (response) {
                console.log(response);
                response.forEach(function (recipe) {
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

    function removeCardRecipesFromDom() {
        $('.recipe-card:not(:first)').remove();
    }

    function removeListRecipesFromDom() {
        $('.recipe-list:not(:first)').remove();
    }

    $('#filter-add-button').click(function () {
        console.log($('.filter-ingredient').val());
        var ingredient = $('.filter-ingredient').val();
        console.log($('.filter-cuisine').val());
        console.log($('.filter-view').val());
        console.log(allCuisines);
        var cuisineId;
        allCuisines.forEach(function (cuisine) {
            if (cuisine.type.toLowerCase() === $('.filter-cuisine').val().toLowerCase()) {
                cuisineId = cuisine.id;
            }
        });
        if (cuisineId === undefined) {
            cuisineId = 0;
        }
        console.log(cuisineId);
        console.log(allCuisines);
        $.ajax({
            method: "GET",
            url: "/api/recipe/filter",
            data: {
                cuisineId: cuisineId,
                ingredient: ingredient
            }
        })
            .done(function (response) {
                console.log(response);
                if ($('.filter-view').val().toLowerCase() === 'grid') {
                    removeListRecipesFromDom();
                    removeCardRecipesFromDom();
                    console.log(response);

                    response.forEach(function (recipe) {
                        console.log(recipe);

                        addCardRecipeTemplate(
                            recipe.id,
                            recipe.title,
                            recipe.preptime,
                            recipe.description,
                            // recipe.user.username,
                            recipe.cover
                        );
                    })
                } else {
                    removeCardRecipesFromDom();
                    removeListRecipesFromDom();
                    console.log(response);
                    response.forEach(function (recipe) {
                        addListRecipeTemplate(
                            recipe.id,
                            recipe.title,
                            recipe.preptime,
                            recipe.description,
                            // recipe.user.username,
                            recipe.cover
                        );
                    })

                }
            // }
                // ;

                // if(!response){
                //     window.location = "index.html";
                //     return;
                // }
            });
    })

    // });
});