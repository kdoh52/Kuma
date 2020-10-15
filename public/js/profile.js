$(document).ready(() => {
    $.get("/api/user_data").then((data) =>{
      $(".member-name").text(data.email);
      $(".member-id").text(data.id);
    });

    $('.profileNav').on('click', function () {
      // console.log("I AM HEREEEEEEEEE")
      $.get("/api/user_data").then((data) => {
          console.log(`requesting /api/user_data with: ${JSON.stringify(data)}`);
          return data.id;
      })
      .then(id => {
          console.log(`redirecting user to /profile/${id}`);
          window.location.replace("/profile/" + id);
      })
      
      // window.location.replace("/profile/" + this.id);
  });
});