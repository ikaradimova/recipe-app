
// (function () {
$(document).ready(function () {
    console.log('diet');
    /** check if diet form exists */

    if($('.diet-add-form').length > 0){

        $.ajax({
            method: "GET",
            url: "/api/profile/getUserProfile"
        })
            .done(function(response) {
                console.log(response);
                if(!response){
                    window.location = "/";
                    return;
                }
            });

        console.log('form exists');
        let dietField = $('#diet-add');
        let dietButton = $('#diet-add-button');

        dietButton.click(function (e) {
            console.log(dietField.val())
            console.log('submit');
            // e.preventDefault();

            /** send request only if all fields are not empty */
            if(dietField.val()){
                $.ajax({
                    url: "/api/diet/add",
                    method: "POST",
                    data: {
                        type: dietField.val(),
                    },
                    success: function (data) {
                        console.log(data);
                        if(data === 'success'){
                            console.log('Diet successfully added');
                            // window.location.href = "profile.html";
                        } else {
                            console.log('error while adding diet')
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