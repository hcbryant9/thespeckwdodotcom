'use strict';




const kinectBTN = document.getElementById("kinect");
const harmonyBTN = document.getElementById("harmony");
const huesBTN = document.getElementById("hues");
const emotionalBTN = document.getElementById("emotional");
const websiteBTN = document.getElementById("website");
const aboutBTN = document.getElementById("about");
const pumpBTN = document.getElementById("pump");
//adding event handler for the click event



kinectBTN.addEventListener('click',function(){
    console.log('button clicked');
    window.location.href = "kinect.html";
});
harmonyBTN.addEventListener('click',function(){
    console.log('button clicked');
    window.location.href = "harmony.html";
});
huesBTN.addEventListener('click',function(){
    console.log('button clicked');
    window.location.href = "game.html";
});
emotionalBTN.addEventListener('click',function(){
    console.log('button clicked');
    window.location.href = "emotions.html";
});
websiteBTN.addEventListener('click',function(){
    console.log('button clicked');
    window.location.href = "index.html";
});
aboutBTN.addEventListener('click',function(){
    console.log('button clicked');
    window.location.href = "about.html";
});
pumpBTN.addEventListener('click',function(){
    console.log('button clicked');
    window.location.href = "pump.html";
});

