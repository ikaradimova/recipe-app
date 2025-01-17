/** Showing navbar items */
$(function () {
    $.ajax({
        method: "GET",
        url: "/api/profile/getUserProfile"
    })
        .done(function (response) {
            console.log(response);
            /** if noone is logged show login and register */
            if (!response) {
                $('.add-recipe-link').hide();
                $('.profile-link').hide();
                $('.logout-link').hide();
                $('.login-link').show();
                $('.register-link').show();
            } else {
                /** while logged in show add recipe, profile and logout */
                $('.add-recipe-link').show();
                $('.profile-link').show();
                $('.logout-link').show();
                $('.login-link').hide();
                $('.register-link').hide();

            }

        });
});