$(document).ready(() => {

    $(".signup").submit(function(event){
        event.preventDefault();

        let newUser = {
            email: $("#email").val().trim(),
            username: $("#username").val().trim(),
            password: $("#password").val().trim()
        };

        if(!newUser.email || !newUser.username || !newUser.password) {
            return;
        }
        console.log(newUser);
        signupUser(newUser);
    });

    function signupUser(newUser) {
        $.post("/api/signup", newUser)
        .then(()=>{
            window.location.replace("/profile-setup");
        })
        .catch((err)=>{
            console.log(err);
        });
    };
});