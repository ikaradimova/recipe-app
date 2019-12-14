// console.log('gdgdfgfdgfdgdfgfgdd');
// (function () {
$(document).ready(function () {
    console.log('cuisine');
    /** check if cuisine form exists */

    if($('.cuisine-add-form').length > 0){

        $.ajax({
            method: "GET",
            url: "/api/profile/getUserProfile"
        })
            .done(function(response) {
                console.log(response);
                if(!response || response.role.name === 'user'){
                    window.location = "/";
                    return;
                }
            });

        console.log('form exists');
        let cuisineField = $('#cuisine-add');
        let cuisineButton = $('#cuisine-add-button');

        cuisineButton.click(function (e) {
            console.log(cuisineField.val())
            console.log('submit');
            // e.preventDefault();

            /** send request only if all fields are not empty */
            if(cuisineField.val()){
                $.ajax({
                    url: "/api/cuisine/add",
                    method: "POST",
                    data: {
                        type: cuisineField.val(),
                    },
                    success: function (data) {
                        console.log(data);
                        if(data.id){
                            alert('Cuisine successfully added!');
                            location.reload();
                        } else {
                            alert('Something went wrong, please try again!');
                            location.reload();
                        }
                        // window.location.replace(data);
                    },
                    fail: function () {
                        console.log('error')
                        // window.location.href = "error.html";
                    }
                });
            }
        });

    }

});