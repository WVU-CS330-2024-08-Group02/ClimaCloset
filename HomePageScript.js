document.addEventListener("DOMContentLoaded", function() {
    const closetButton = document.querySelector(".closetDetails");
    closetButton.addEventListener("click", function() {
        window.location.href = "/closet-details";  
    });

    const outfitButton = document.querySelector(".circle");
    outfitButton.addEventListener("click", function() {
        window.location.href = "/generate-outfit";  
    });

    const weatherButton = document.querySelector(".weatherDetails");
    weatherButton.addEventListener("click", function() {
        window.location.href = "/weather-details"; 
    });
});