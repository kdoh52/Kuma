//When user clicks the "Creat Profile Button!" the user will be redirected to their profile



$(document).ready(() => {

    function createProfile(dogProfile) {
        console.log('Incoming payload passed into createProfile');
        // adding new variables
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        
        // changed POSt 
        $.post("/api/profiles", {...dogProfile,UserId: urlParams.get('id')})
        .then(() => {
            console.log('Navigating to /profile');
            window.location.replace("/profile");
        })
        .catch((err) => {
            console.log('!!! error !!!');
            console.log(err);
        });
    };

    $("#setup-form").submit(function(event){
        event.preventDefault();
        console.log('profile-setup was submitted');

        let dogProfile = {
            petName: $("#petName").val().trim(),
            petBreed: $("#petBreed").val().trim(),
            petAge: $("#petAge").val().trim(),
            petGender: $("#petGender").val().trim(),
            petFixed: $("#petFixed").val().trim(),
            petBio: $("#petBio").val().trim(),
            petEnergy: $("#petEnergy").val().trim(),
            petPersonality: $("#petPersonality").val().trim(), 
            petChip: $("#petChip").val().trim(),
            petVet: $("#petVet").val().trim(),
            petImg: $("#petImg").val().trim(),
            
        };

        if (
            !dogProfile.petName || 
            !dogProfile.petBreed || 
            !dogProfile.petAge || 
            !dogProfile.petGender ||
            !dogProfile.petFixed ||
            !dogProfile.petEnergy || 
            !dogProfile.petPersonality || 
            !dogProfile.petBio || 
            !dogProfile.petChip || 
            !dogProfile.petVet
            ) {
            console.log('Not all of the input fields were filled out, start over');
            return;
        }

        console.log(`dogProfile: ${JSON.stringify(dogProfile)}`);
        createProfile(dogProfile);
    });

});