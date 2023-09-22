'use strict';



const musicBTN = document.getElementById("music");
const videosBTN = document.getElementById("mp4s");
const seoulBTN = document.getElementById("seoul");
const flashedBTN = document.getElementById("flashed");
const julyBTN = document.getElementById("july");
const orangeBTN = document.getElementById("orange");
const edinburghBTN = document.getElementById("edinburgh");
const dylonBTN = document.getElementById("dylon");
const jpgBTN = document.getElementById("jpgs");
const projectsBTN = document.getElementById("projects");
//adding event handler for the click event



seoulBTN.addEventListener('click',function(){
    console.log('button clicked');
    window.location.href = "sheets.html";
});
orangeBTN.addEventListener('click',function(){
    console.log('button clicked');
    window.location.href = "orange.html";
});
julyBTN.addEventListener('click',function(){
    console.log('button clicked');
    window.location.href = "three.html";
});
flashedBTN.addEventListener('click',function(){
    console.log('button clicked');
    window.location.href = "flashed.html";
});
edinburghBTN.addEventListener('click', function(){
    console.log('button clicked');
    window.location.href = "edinburgh.html";
});



