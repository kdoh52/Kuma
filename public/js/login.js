$(document).ready(() => {

    console.log("Login JS loaded");

    $("#loginForm").submit(function (event) {
        event.preventDefault();

        console.log('#login-btn clicked');

        const getUser = {
            email: $("#loginEmail").val().trim(),
            password: $("#loginPassword").val().trim()
        };

        if (!getUser.email || !getUser.password) {
            return;
        }
        console.log(`getUser: ${JSON.stringify(getUser)}`);
        loginUser(getUser)
    });

    $("#signup-btn").submit(function (event) {
        event.preventDefault();

        console.log('#signup-btn clicked');

        window.location.replace("/signup");

    });

    function loginUser(getUser) {
        console.log(`firing loginUser with ${JSON.stringify(getUser)}`);
        $.post("/api/login", {
            email: getUser.email,
            password: getUser.password
        })
        .then(data => {
            console.log(`.... making request to /api/user_data with ${JSON.stringify(data)}`);

            $.get("/api/user_data").then((data) => {
                console.log(`requesting /api/user_data with: ${JSON.stringify(data)}`);
                return data.id;
            })
            .then(id => {
                console.log(`redirecting user to /profile/${id}`);
                window.location.replace("/profile/" + id);
            })
            
        })
        .catch((err) => {
            console.log(`an error occurred! ${JSON.stringify(err)}`);
        });
    };

    // Toggel Image 
    $('#toggleLogin').on('click', function () {
        [].map.call($('.login'), function (el) {
            el.classList.toggle('login--open');
        });
    });

});


