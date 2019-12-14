
// (function () {
$(document).ready(function () {
    console.log('navbar');

        $.ajax({
            method: "GET",
            url: "/api/profile/getUserProfile"
        })
            .done(function(response) {
                console.log(response);
                if(response === ''){
                    console.log('not logged');
                    $(".add-recipe-link").hide();
                    $(".profile-link").hide();
                    $(".logout-link").hide();
                } else {
                    $(".login-link").hide();
                    $(".register-link").hide();
                }
                // if(!response){
                //     window.location = "index.html";
                //     return;
                // }
            });

});