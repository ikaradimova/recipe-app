$(function(){
    // $(".custom-navbar").load("navbar.html");

// (function () {
//     $(document).ready(function ()

    var path =window.location.pathname;
    var pathParts = path.split('/');
    if(pathParts.length < 3){
        window.location = "/";
    } else {
        var id = pathParts[2];
        console.log(pathParts);
        var recipe;
        var recipeUserId;

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
                    if(response === null){
                        window.location = '/';
                    }
                    recipe = response;
                    console.log(recipe);
                    recipeUserId = recipe.user.id;

                    $(".recipe-title").html(response.title);
                    $(".recipe-preptime").html(response.preptime);
                    $(".recipe-description").html(response.description);
                    // $(".recipe-ingredients").html(response.ingredients);
                    $(".recipe-preparation").html(response.preparation);
                    $(".recipe-author").html(response.user.username);
                    $(".recipe-cover").attr('src', response.cover);
                    $(".recipe-publish-date").html((new Date(response.createdAt)).toDateString());

                    $(".recipe-cuisine").html(response.cuisine.type);

                    var allDiets = '';
                    response.diets.forEach(function(diet){
                        allDiets += diet.type + ' ';
                    });

                    $(".recipe-diet").html(allDiets);

                    var ingredients = response.ingredients.split(',');
                    ingredients.forEach(function(ingredient){
                        if(ingredient !== ''){
                            $(".recipe-ingredients").append($('<li>', {
                                value: ingredient,
                                text : ingredient
                            }));
                        }
                    })
                    console.log(ingredients);
                    $.ajax({
                        method: "GET",
                        url: "/api/profile/getUserProfile"
                    })
                        .done(function(response) {
                            console.log(response);
                            if(!response){
                                $('.edit-recipe-link').hide();
                                $('.delete-recipe-link').hide();
                                // return;
                            } else {
                                if(response.role.name === 'user'){
                                    $('.delete-recipe-link').hide();
                                    console.log(response.id);
                                    console.log(recipe);
                                    console.log(recipeUserId);
                                    if(response.id !== recipeUserId){
                                        $('.edit-recipe-link').hide();
                                    } else {
                                        $('.edit-recipe-link').attr('href', '/recipe/edit/' + id);
                                    }
                                    // $('.add-cuisine-link').hide();
                                    // $('.add-diet-link').hide();
                                } else {
                                    $('.edit-recipe-link').attr('href', '/recipe/edit/' + id);
                                }
                            }
                        });

                    $('.delete-recipe-link').click(function () {
                        $.ajax(
                            {
                                method : "DELETE",
                                url : "/api/recipe/delete",
                                data: {
                                    id: id
                                },
                                complete : function(response) {
                                    console.log(response);
                                    if (response.status === 200) {
                                        alert("Deletion successful!")
                                        window.location.href = "/";

                                    } else {
                                        alert("Some error occurred!");
                                    }
                                }
                            })
                    })


                    // if(!response){
                    //     window.location = "index.html";
                    //     return;
                    // }
                });
        // }

        // getRecipe();
    }




    // });
});