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
    window.location.href = "projects.html";
});
jpgBTN.addEventListener('click',function(){
    console.log('button clicked');
    window.location.href = "jpgs.html";
});

