$(document).ready(() => {

    $("#signupForm").submit(function(event) {
        event.preventDefault();

        let newUser = {
            email: $("#email").val().trim(),
            username: $("#username").val().trim(),
            password: $("#password").val().trim()
        };

        console.log(newUser)
    });

});