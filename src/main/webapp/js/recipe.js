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