$(document).ready(()=>{
    $('.dogName').on('click', function () {
        console.log(this.id)
        // $.get("/api/user_data").then((data) => {
        //     console.log(`requesting /api/user_data with: ${JSON.stringify(data)}`);
        //     return data.id;
        // })
        // .then(id => {
        //     console.log(`redirecting user to /profile/${id}`);
        //     window.location.replace("/profile/" + id);
        // })
        
        window.location.replace("/profile/" + this.id);
    });

    $('.profileNav').on('click', function () {
        // console.log("I AM HERE",this)
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