//When user clicks the "Creat Profile Button!" the user will be redirected to their profile

$(document).ready(() => {

    $(".profileSetup").submit(function(event){
        event.preventDefault();

        let dogProfile = {
            petName: $("#petName").val().trim(),
            petBreed: $("#petBreed").val().trim(),
            petAge: $("#petAge").val().trim(),
            petEnergy: $("#petEnergy").val().trim(),
            petPersonality: $("#petPersonality").val().trim(),
            petBio: $("#petBio").val().trim(),
            petChip: $("#petChip").val().trim(),
            petVet: $("#petVet").val().trim(),
            petImg: $("#petImg").val().trim()
        };

        if(!dogProfile.petName || !dogProfile.petBreed || !dogProfile.petAge || !dogProfile.petEnergy || !dogProfile.petPersonality || !dogProfile.petBio || !dogProfile.petChip || !dogProfile.petVet) {
            return;
        }
        console.log(dogProfile);
        createProfile(dogProfile);
    });

    function createProfile(dogProfile) {
        $.post("/api/profiles", dogProfile)
        .then(()=>{
            window.location.replace("/dashboard");
        })
        .catch((err)=>{
            console.log(err);
        });
    };
});