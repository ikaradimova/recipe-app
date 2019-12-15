$(function () {
    var allCuisines;
    /** Getting all cuisines from db so they can be displayed in filter */
    function getAllCuisines() {
        $.ajax({
            method: "GET",
            url: "/api/cuisine/getCuisines"
        })
            .done(function (response) {
                allCuisines = response;
                /** Adding cuisines to the select */
                $.each(response, function (i, cuisine) {
                    $('.filter-cuisine').append($('<option>', {
                        value: cuisine.type,
                        text: cuisine.type
                    }));
                });
            });
    }

    /**
     * Function for generating recipe template depending on what type of view is selected
     * @param id
     * @param title
     * @param description
     * @param cover
     * @param type - grid/list
     */
    function addRecipeTemplate(id, title, description, cover, type){
        var recipeBox;
        var titleField;
        var descriptionField;
        var appendTo;
        if(type === 'grid'){
            recipeBox = $('.recipe-card:first').clone();
            titleField = '.card-title';
            descriptionField = '.card-text';
            appendTo = $('.recipe-row');
        } else {
            recipeBox = $('.recipe-list:first').clone();
            titleField = '.list-title';
            descriptionField = '.list-text';
            appendTo = $('.recipe-list-group');
        }
        // var recipeCard = recipeBox.clone();
        recipeBox.attr('id', id);
        recipeBox.find('img').attr('src', cover);
        recipeBox.find(titleField).html(title);
        recipeBox.find(descriptionField).html(description.substr(0, 100) + '...');
        recipeBox.find('a').attr('href', '/recipe/' + id);
        recipeBox.show();
        appendTo.append(recipeBox);
    }

    /** Unified function for removing all recipes from the dom */
    function removeRecipesFromDom(){
        removeCardRecipesFromDom();
        removeListRecipesFromDom();
    }

    /** Function for removing card recipes from the dom */
    function removeCardRecipesFromDom() {
        $('.recipe-card:not(:first)').remove();
    }

    /** Function for removing list recipes from the dom */
    function removeListRecipesFromDom() {
        $('.recipe-list:not(:first)').remove();
    }

    // function addCardRecipeTemplate(id, title, description, cover) {
    //     var recipeCard = $('.recipe-card:first').clone();
    //     recipeCard.attr('id', id);
    //     recipeCard.find('img').attr('src', cover);
    //     recipeCard.find('.card-title').html(title);
    //     recipeCard.find('.card-text').html(description.substr(0, 100) + '...');
    //     recipeCard.find('a').attr('href', '/recipe/' + id);
    //     recipeCard.show();
    //
    //     $('.recipe-row').append(recipeCard);
    // }
    //
    // function addListRecipeTemplate(id, title, description, cover) {
    //     var recipeList = $('.recipe-list:first').clone();
    //     recipeList.attr('id', id);
    //     recipeList.find('img').attr('src', cover);
    //     recipeList.find('.list-title').html(title);
    //     recipeList.find('.list-text').html(description.substr(0, 100) + '...');
    //     recipeList.find('a').attr('href', '/recipe/' + id);
    //     recipeList.show();
    //
    //     $('.recipe-list-group').append(recipeList);
    // }

    /** Function for getting all recipes (on page load) */
    function getAllRecipes() {
        $.ajax({
            method: "GET",
            url: "/api/recipe/getRecipes"
        })
            .done(function (response) {
                // console.log(response);
                response.forEach(function (recipe) {
                    // console.log(recipe);
                    // grid
                    addRecipeTemplate(
                        recipe.id,
                        recipe.title,
                        recipe.description,
                        recipe.cover,
                        'grid'
                    )
                });
            });
    }

    getAllCuisines();
    getAllRecipes();

    /** On any filter change refilter elements depending on values */
    $('.filter').change(function () {
        var ingredient = $('.filter-ingredient').val();
        var cuisineId;
        /** getting cuisine id of the chosen cuisine */
        allCuisines.forEach(function (cuisine) {
            if (cuisine.type.toLowerCase() === $('.filter-cuisine').val().toLowerCase()) {
                cuisineId = cuisine.id;
            }
        });

        /** if no cuisine has been chosen, all should be displayed (sending 0 to controller) */
        if (cuisineId === undefined) {
            cuisineId = 0;
        }

        $.ajax({
            method: "GET",
            url: "/api/recipe/filter",
            data: {
                cuisineId: cuisineId,
                ingredient: ingredient
            }
        })
            .done(function (response) {
                /** displaying different views depending on the chosen one */
                if ($('.filter-view').val().toLowerCase() === 'grid') {
                    removeRecipesFromDom();
                    removeRecipesFromDom();
                    response.forEach(function (recipe) {
                        addRecipeTemplate(
                            recipe.id,
                            recipe.title,
                            recipe.description,
                            recipe.cover,
                            'grid'
                        )
                    })
                } else {
                    removeRecipesFromDom();
                    removeRecipesFromDom();
                    response.forEach(function (recipe) {
                        addRecipeTemplate(
                            recipe.id,
                            recipe.title,
                            recipe.description,
                            recipe.cover,
                            'list'
                        )
                    })

                }
            });
    })
});