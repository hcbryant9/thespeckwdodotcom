'use strict';




const kinectBTN = document.getElementById("kinect");
const harmonyBTN = document.getElementById("harmony");
const huesBTN = document.getElementById("hues");
const emotionalBTN = document.getElementById("emotional");

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
    window.location.href = "emotional.html";
});

