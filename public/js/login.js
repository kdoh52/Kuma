$(document).ready(() => {

    $("#loginForm").submit(function(event) {
        event.preventDefault();

        let getUser = {
            username: $("#username").val().trim(),
            password: $("#password").val().trim()
        };

        if (!newUser.username || !newUser.password) {
            return;
        }

        console.log(getUser)

        loginUser(getUser)
    });

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/users",
        success: function (html) {
          console.log(html);
        }
    });
    
    function loginUser(getUser) {
        // concatenate id?

        // let id = "";
        // console.log(id);

        $.post("/api/profiles", getUser)
        .then(function() {
            window.location.replace("/profile");
        })
        .catch(function(err) {
            console.log(err);
        });
    };
});