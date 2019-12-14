(function () {
	console.log('login');
	/** check if login form exists */
	if($('#login-form').length > 0){
		console.log('form exists');
		let usernameField = $('#login-username');
		let passwordField = $('#login-password');

		$('#confirm-login').click(function (e) {
			console.log('submit');
			e.preventDefault();

			/** send request only if all fields are not empty */
			if(usernameField.val() !== '' &&
				passwordField.val() !== ''
			){
				$.ajax({
					url: "/login",
					method: "POST",
					data: {
						username: usernameField.val(),
						password: passwordField.val(),
					},
					success: function (data) {
						console.log(data);
						/** if success redirect to profile page */
						if(data === 'success'){
							console.log('successful registration');
							window.location.href = "/profile";
						} else if(data === 'error') {
							console.log('error')
						} else {
							console.log(data);
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