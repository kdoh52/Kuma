$(document).ready(() => {

  $(".login").submit(function(event){
      event.preventDefault();

      const getUser = {
          email: $("#email").val().trim(),
          password: $("#password").val().trim()
      };

      if (!getUser.email || !getUser.password) {
          return;
      }
      console.log(getUser)
      loginUser(getUser)
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
});