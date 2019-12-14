$(function(){
    $(function(){
        $(".custom-navbar").load("navbar.html");
    });

//
//     var loadProfileData = function(){
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
           var $email = $("#profile-email");
           $email.val(response.email);
           var $user = $("#profile-username");
           $user.val(response.username)
        });

    $('#profile-update').click(function(){
        console.log($('#profile-username').val());
        console.log($('#profile-email').val());
        console.log($('#profile-password').val());
        console.log($('#profile-repeat-password').val());
            $.ajax({
                url:'/api/profile/update',
                method:"POST",
                data:
                    {
                        username:$('#profile-username').val(),
                        email :$('#profile-email').val(),
                        password: $('#profile-password').val(),
                        rePassword:$('#profile-repeat-password').val()
                    },
                complete:function(response){
                    console.log(response);
                    if(response.status === 200){
                        $('#register-pass').val('');
                        $('#confirm-register-pass').val('');

                    }else{
                        alert("ERROR");
                    }
                }
            })

        });

//     }
//     loadProfileData();
})