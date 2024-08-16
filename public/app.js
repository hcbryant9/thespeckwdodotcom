'use strict';


const videosBTN = document.getElementById("video-photo");

const jpgBTN = document.getElementById("jpg-photo");
const projectsBTN = document.getElementById("project-photo");

//adding event handler for the click event


videosBTN.addEventListener('click',function(){
    console.log('button clicked');
    window.location.href = "videos.html";
});

projectsBTN.addEventListener('click',function(){
    console.log('button clicked');
    window.location.href = "newproject.html";
});
jpgBTN.addEventListener('click',function(){
    console.log('button clicked');
    window.location.href = "jpgs.html";
});

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) {
        alert('Please select an image.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const imgElement = new Image();
        imgElement.onload = function() {
            displayImageOnCanvas(imgElement, document.getElementById('outputCanvas'), true);
        };
        imgElement.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function displayImageOnCanvas(imgElement, canvas, save) {
    const ctx = canvas.getContext('2d');
    canvas.width = imgElement.width;
    canvas.height = imgElement.height;
    ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);
    canvas.className = 'rotate'; // Apply the CSS animation class
}