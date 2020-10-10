$(document).ready(() => {
    $.get("/api/user_data").then((data) => {
      $(".member-name").text(data.email);
      $(".member-id").text(data.id);
    });
});