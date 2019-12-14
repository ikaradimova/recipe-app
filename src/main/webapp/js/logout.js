// $(function () {
    $(document).ready(function () {
    console.log('gdfgfdg');
    // console.log($('#btn_logout'));
    $('.logout').click(function() {
        console.log('test');
        $.ajax(
            {
                method : "POST",
                url : "/api/profile/logout",
                complete : function(resp) {
                    if (resp.status === 200) {
                        window.location.href = "/";

                    } else {
                        alert("ERROR!");

                    }

                }

            })

    });

});