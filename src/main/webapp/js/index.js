$(function(){
    // $(".custom-navbar").load("navbar.html");

// (function () {
//     $(document).ready(function () {
        console.log('navbar');

    function addCardRecipeTemplate(id, title, preptime, description, cover) {
        console.log('recipe card');
        var recipeCard = $('.recipe-card:first').clone();

        recipeCard.attr('id', id);
        recipeCard.find('img').attr('src', cover);
        recipeCard.find('.card-title').html(title);
        recipeCard.find('.card-text').html(description);
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

    // });
});