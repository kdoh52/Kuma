$(document).ready(() => {

    console.log("Login JS loaded");

  $("#loginForm").submit(function(event){
      event.preventDefault();

      console.log('#login-btn clicked');

      const getUser = {
          email: $("#loginEmail").val().trim(),
          password: $("#loginPassword").val().trim()
      };

      if (!getUser.email || !getUser.password) {
          return;
      }
      console.log(getUser)
      loginUser(getUser)
  });

  $("#signup-btn").submit( function(event){
    event.preventDefault();

    console.log('#signup-btn clicked');

    window.location.replace("/signup");
    
});

  function loginUser(getUser) {
      $.post("/api/login", {
        email: getUser.email,
        password: getUser.password
      })
      .then(()=>{
          window.location.replace("/profile");
      })
      .catch((err)=>{
          console.log(err);
      });
  };
  // Toggel Image 
  $('#toggleLogin').on('click', function () {
        [].map.call($('.login'), function(el) {
        el.classList.toggle('login--open');
        });
    });

});


