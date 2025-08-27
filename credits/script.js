// Select the surprise button
const surpriseBtn = document.getElementById("surprise-btn");

// Create a GIF overlay element
const gifOverlay = document.createElement("div");
gifOverlay.style.position = "fixed";
gifOverlay.style.top = "50%";
gifOverlay.style.left = "50%";
gifOverlay.style.transform = "translate(-50%, -50%)";
gifOverlay.style.zIndex = "1000";
gifOverlay.style.display = "none"; // hidden initially
gifOverlay.style.pointerEvents = "none"; // allows clicks through
gifOverlay.innerHTML = `<img src="https://media1.tenor.com/m/NMK97H67NPgAAAAC/funny.gif" alt="Cool Effect" style="width:300px; border-radius:15px; box-shadow:0 0 20px #000;">`;
document.body.appendChild(gifOverlay);

// Show GIF when button is clicked
surpriseBtn.addEventListener("click", () => {
    gifOverlay.style.display = "block";

    // Hide the GIF after 3 seconds
    setTimeout(() => {
        gifOverlay.style.display = "none";
    }, 3000);
});
